# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Development

```bash
bun dev          # Start development server
bun build        # Build for production
bun preview      # Preview production build
```

### Code Quality

```bash
bun run format         # Format code with Biome
bun run format:check   # Check formatting without changes
bun run lint           # Run oxlint
bun run lint:fix       # Fix linting issues
bun run typecheck      # Type check with tsgo
bun run sort-package   # Sort package.json
```

## Architecture Overview

This project uses a sophisticated 3-environment build system:

### 1. RSC Environment (`src/framework/entry.rsc.tsx`)

- Handles React Server Components rendering
- Processes server actions (POST requests)
- Serializes React components to RSC stream
- Routes requests to SSR or returns raw RSC based on content-type

### 2. SSR Environment (`src/framework/entry.ssr.tsx`)

- Traditional server-side HTML rendering
- Deserializes RSC stream back to React components
- Injects RSC payload into HTML for hydration
- Uses edge runtime (`react-dom/server.edge`)

### 3. Client Environment (`src/framework/entry.browser.tsx`)

- Handles client-side hydration
- Manages SPA navigation with History API
- Re-fetches RSC on navigation
- Implements server action callbacks

## Key Technical Details

- **React 19** with full RSC support including server actions
- **Vite** with `@vitejs/plugin-rsc` for RSC compilation
- **Rolldown** (Rust-based bundler) via `rolldown-vite`
- **Bun runtime** requirement (>=1.1.20)
- **TailwindCSS v4** with Vite integration

## Server Actions Flow

1. Form submissions or programmatic calls trigger POST requests
2. RSC environment processes the action
3. State updates and new RSC payload generated in single round-trip
4. Client receives updated payload and re-renders

## Development Features

- Hot Module Replacement for both client and server code
- Debug URLs:
  - `?__rsc` - View raw RSC stream
  - `?__html` - Force HTML response
  - `?__nojs` - Simulate JavaScript-disabled browser
- Progressive enhancement support for forms

## Configuration

### Code Style

- **Formatter**: Biome (2 spaces, 100 char line width, double quotes)
- **Linter**: oxlint with TypeScript and Unicorn plugins
- **Type Checking**: tsgo (experimental TypeScript implementation)
- **Pre-commit**: Automatic formatting, linting, and package.json sorting via husky

### Build Configuration

The `vite.config.ts` defines three separate builds:

- RSC build targeting `./src/framework/entry.rsc.tsx`
- SSR build targeting `./src/framework/entry.ssr.tsx`
- Browser build targeting `./src/framework/entry.browser.tsx`

## Important Patterns

### Adding Server Components

Server components go in regular `.tsx` files without "use client" directive. They can use async/await and access server-only APIs.

### Adding Client Components

Mark files with `"use client"` directive at the top. These run in the browser and can use hooks and browser APIs.

### Server Actions

```tsx
async function serverAction() {
	"use server";
	// Server-side logic here
}
```

### Navigation

Use standard `<a>` tags for navigation. The client-side router intercepts clicks for SPA behavior while maintaining progressive enhancement.

## Dependencies Notes

- Uses experimental/latest versions of several packages
- Requires Bun >= 1.1.20 (enforced via engines field)
- TailwindCSS v4 with new architecture
- TypeScript native preview for tsgo support
