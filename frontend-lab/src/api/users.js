const BASE = (import.meta.env.VITE_API_URL ?? "https://jsonplacehder.typicode.com").replace(/\/$/, "");

async function request(path, options = {}) {
  const response = await fetch(`${BASE}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }

  return response.json();
}

export const fetchUsers = () => request("/users");
export const fetchUser = (id) => request(`/users/${id}`);
export const createUser = (body) =>
  request("/users", {
    method: "POST",
    body: JSON.stringify(body),
  });

export const updateUser = (id, body) =>
  request(`/users/${id}`, {
    method: "PATCH",
    body: JSON.stringify(body),
  });
