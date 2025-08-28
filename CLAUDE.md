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

This is a standard Vite + React application with the following features:

- **React 19** for the latest React features
- **Vite** with **Rolldown** (Rust-based bundler) for fast builds
- **TailwindCSS v4** with Vite integration
- **TypeScript** for type safety
- **Bun runtime** requirement (>=1.1.20)

## Key Technical Details

- Single-page application with client-side rendering
- Hot Module Replacement for fast development
- Optimized production builds with code splitting

## Configuration

### Code Style

- **Formatter**: Biome (2 spaces, 100 char line width, double quotes)
- **Linter**: oxlint with TypeScript and Unicorn plugins
- **Type Checking**: tsgo (experimental TypeScript implementation)
- **Pre-commit**: Automatic formatting, linting, and package.json sorting via husky

### Build Configuration

The `vite.config.ts` uses:
- `@vitejs/plugin-react` for React support and Fast Refresh
- `@tailwindcss/vite` for TailwindCSS v4 integration
- Standard Vite build configuration with `index.html` as entry point

## Project Structure

```
src/
├── main.tsx      # Application entry point
├── App.tsx       # Root component
└── index.css     # Global styles with Tailwind directives
```

## Adding Components

Create React components in `.tsx` files. The application uses standard React patterns with hooks and functional components.

## Dependencies Notes

- Uses experimental/latest versions of several packages
- Requires Bun >= 1.1.20 (enforced via engines field)
- TailwindCSS v4 with new architecture
- TypeScript native preview for tsgo support