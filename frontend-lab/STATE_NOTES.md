# State Management Notes

- **Server vs client state:** Server state (users from the API) has a remote source of truth and needs caching, stale data handling, deduplication, retries, and refetching. Client state (search, grid/list view, theme) exists only in the browser and should be kept in local state, Context, or a small UI store.
- **Why Redux Toolkit over Zustand:** Redux Toolkit is preferred for large applications with many cross-cutting client-state transitions, strict conventions, middleware, and time-travel/devtools debugging. Zustand is simpler for small/medium UI state.
- **`staleTime`:** It tells TanStack Query how long cached server data is considered fresh (30 seconds in this app). Within that period, normal remount/navigation should reuse the cache without a new network request.
- **Invalidation:** `invalidateQueries` is preferred with a real API because it marks cached data stale and lets the server response become the source of truth for the refetched cache. JSONPlaceholder does not persist POST/PATCH requests, so this assignment patches the cache directly for create/favourite examples.
