
import { useState } from "react";
import { Link } from "react-router-dom";
import { Card } from "../componenets/ui/Card";
import { Button } from "../componenets/ui/Button";
import { useCreateUser, useUsers } from "../hooks/useUsers";
import { useUiStore } from "../store/ui";

export default function Users() {
  const { data: users, isPending, isError, error, isFetching, refetch } = useUsers();
  const createUser = useCreateUser();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const view = useUiStore((state) => state.view);
  const setView = useUiStore((state) => state.setView);
  const search = useUiStore((state) => state.search);
  const setSearch = useUiStore((state) => state.setSearch);

  const submit = (event) => {
    event.preventDefault();
    createUser.mutate(
      { name, email },
      {
        onSuccess: () => {
          setName("");
          setEmail("");
        },
      },
    );
  };

  if (isPending) return <p role="status">Loading users…</p>;
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

  const filteredUsers = users.filter((user) =>
    `${user.name} ${user.email}`.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold">Our Users</h1>

      <form className="mb-6 grid gap-3 rounded-card border border-line bg-surface p-4 sm:grid-cols-[1fr_1fr_auto]" onSubmit={submit}>
        <label className="grid gap-1">
          <span className="text-sm">Name</span>
          <input className="rounded-card border border-line bg-bg px-3 py-2" value={name} onChange={(event) => setName(event.target.value)} required />
        </label>
        <label className="grid gap-1">
          <span className="text-sm">Email</span>
          <input className="rounded-card border border-line bg-bg px-3 py-2" type="email" value={email} onChange={(event) => setEmail(event.target.value)} required />
        </label>
        <div className="flex items-end">
          <Button type="submit" disabled={createUser.isPending}>
            {createUser.isPending ? "Adding…" : "Add user"}
          </Button>
        </div>
        {createUser.isError && (
          <p className="text-red-600 sm:col-span-3" role="alert">
            Failed to add user: {createUser.error.message}
          </p>
        )}
      </form>

      <div className="mb-4 flex flex-wrap items-center gap-3">
        <input
          className="min-w-52 rounded-card border border-line bg-surface px-3 py-2"
          type="search"
          placeholder="Search users"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
        <Button type="button" variant={view === "grid" ? "primary" : "ghost"} onClick={() => setView("grid")}>
          Grid
        </Button>
        <Button type="button" variant={view === "list" ? "primary" : "ghost"} onClick={() => setView("list")}>
          List
        </Button>
        {isFetching && <small role="status">Refreshing…</small>}
      </div>

      <ul className={view === "grid" ? "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3" : "grid gap-3"}>
        {filteredUsers.map((user) => (
          <li key={user.id}>
            <Card>
              <Link className="block" to={`/users/${user.id}`}>
                <h2 className="text-xl font-semibold">{user.name}</h2>
                <p className="text-muted">{user.email}</p>
              </Link>
            </Card>
          </li>
        ))}
      </ul>
    </div>
  );
}
