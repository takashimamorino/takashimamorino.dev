import "./index.css"; // css import is automatically injected in exported server components

export function Root() {
  return (
    <html lang="ja">
      <head>
        <meta charSet="UTF-8" />
        {/* <link rel="icon" type="image/svg+xml" href="/vite.svg" /> */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>takashimamorion.dev</title>
      </head>
      <body>
        <App />
      </body>
    </html>
  );
}

function App() {
  return <h1>takashimamorion.dev</h1>;
}
