import { createRootRoute, Link, Outlet } from "@tanstack/react-router";

export const Route = createRootRoute({
  component: RootLayout,
});

function RootLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-white text-gray-900">
      <header className="border-b border-gray-200">
        <div className="container mx-auto max-w-4xl px-6 py-4">
          <Link to="/" className="text-xl hover:opacity-80 transition-opacity">
            takashimamorino.dev
          </Link>
        </div>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="border-t border-gray-200">
        <div className="container mx-auto max-w-4xl px-6 py-4">
          <p className="text-sm text-gray-500">© {new Date().getFullYear()} takashimamorino</p>
        </div>
      </footer>
    </div>
  );
}
