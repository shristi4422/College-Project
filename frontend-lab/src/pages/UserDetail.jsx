import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import { updateUser } from "../api/users";
import { Card } from "../componenets/ui/Card";
import { Button } from "../componenets/ui/Button";
import { useUser } from "../hooks/useUsers";

export default function UserDetail() {
  const { id } = useParams();
  const { data: user, isPending, isError, error, refetch } = useUser(id);
  const queryClient = useQueryClient();

  const favouriteMutation = useMutation({
    mutationFn: (favourite) => updateUser(id, { favourite }),
    onMutate: async (favourite) => {
      await queryClient.cancelQueries({ queryKey: ["users", id] });
      const previous = queryClient.getQueryData(["users", id]);
      queryClient.setQueryData(["users", id], (old) => old ? { ...old, favourite } : old);
      queryClient.setQueryData(["users"], (old) =>
        old?.map((item) => item.id === Number(id) ? { ...item, favourite } : item),
      );
      return { previous };
    },
    onError: (_error, _variables, context) => {
      queryClient.setQueryData(["users", id], context?.previous);
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  if (isPending) return <p role="status">Loading user…</p>;
  if (isError) {
    return (
      <p role="alert">
        Failed: {error.message}{" "}
        <Button type="button" onClick={() => refetch()}>
          Retry
        </Button>
      </p>
    );
  }

  const favourite = Boolean(user.favourite);

  return (
    <Card className="max-w-xl">
      <p className="mb-2 text-sm text-muted">User #{user.id}</p>
      <h1 className="text-3xl font-bold">{user.name}</h1>
      <p className="mt-2 text-muted">{user.email}</p>
      {user.phone && <p className="mt-2">Phone: {user.phone}</p>}
      {user.website && <p className="mt-1">Website: {user.website}</p>}
      <div className="mt-6 flex flex-wrap gap-3">
        <Button
          type="button"
          variant={favourite ? "ghost" : "primary"}
          disabled={favouriteMutation.isPending}
          onClick={() => favouriteMutation.mutate(!favourite)}
        >
          {favourite ? "Remove favourite" : "Favourite"}
        </Button>
        <Link className="inline-flex items-center rounded-card border border-line px-4 py-2" to="/users">
          Back to users
        </Link>
      </div>
      {favouriteMutation.isError && (
        <p className="mt-3 text-red-600" role="alert">
          Could not update favourite. The previous state was restored.
        </p>
      )}
    </Card>
  );
}