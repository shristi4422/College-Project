import { NavLink, Outlet } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { Button } from "./ui/Button";

function Layout() {
  const { theme, toggle } = useTheme();

  return (
    <>
      <header className="border-b border-line bg-surface text-fg">
        <nav className="mx-auto flex max-w-6xl flex-wrap items-center gap-4 p-4">
          <span className="mr-auto text-lg font-semibold">frontend-lab</span>
          <NavLink to="/users" className="text-muted hover:text-fg">
            Users
          </NavLink>
          <NavLink to="/" className="text-muted hover:text-fg">
            Home
          </NavLink>
          <Button
            type="button"
            variant="ghost"
            aria-label="Toggle theme"
            aria-pressed={theme === "dark"}
            onClick={toggle}
          >
            {theme === "dark" ? "☀️" : "🌙"}
          </Button>
        </nav>
      </header>

      <main className="mx-auto max-w-6xl p-4 md:p-8">
        <Outlet />
      </main>
    </>
  );
}

export default Layout;