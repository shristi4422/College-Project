
import { Card } from "../componenets/ui/Card";

const users = [
  { id: 1, name: "Ram", email: "ram@example.com" },
  { id: 2, name: "Sita", email: "sita@example.com" },
  { id: 3, name: "Hari", email: "hari@example.com" },
  { id: 4, name: "Gita", email: "gita@example.com" },
  { id: 5, name: "Shyam", email: "shyam@example.com" },
  { id: 6, name: "Rita", email: "rita@example.com" },
];

export default function Users() {
  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold">Our Users</h1>

      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {users.map((user) => (
          <li key={user.id}>
            <Card>
              <h2 className="text-xl font-semibold">{user.name}</h2>
              <p className="text-muted">{user.email}</p>
            </Card>
          </li>
        ))}
      </ul>
    </div>
  );
}
