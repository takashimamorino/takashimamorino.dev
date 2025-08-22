import type { ReactNode } from "react";
import "../global.css";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ja">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>takashimamorino.dev</title>
      </head>
      <body className="min-h-screen bg-white flex flex-col">
        <header className="border-b border-gray-200">
          <nav className="container mx-auto px-4 py-4 max-w-4xl">
            <div className="flex items-center justify-between">
              <a href="/" className="text-xl">
                takashimamorino.dev
              </a>
            </div>
          </nav>
        </header>
        <main className="flex-1">{children}</main>
        <footer className="border-t border-gray-200 mt-auto">
          <div className="container mx-auto px-4 py-6 max-w-4xl text-center text-gray-500 text-sm">
            © {new Date().getFullYear()} takashimamorino.dev
          </div>
        </footer>
      </body>
    </html>
  );
}
