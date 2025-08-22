# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Core Development

- `bun --bun run dev` - Start development server (uses @lazarv/react-server)
- `bun --bun run build` - Build for production (output in `.react-server` directory)
- `bun --bun start` - Run production server

### Code Quality

- `bun typecheck` - Run TypeScript type checking

## Architecture

This is a React Server Components application using [@lazarv/react-server](https://react-server.dev) framework with:

- **Entry Point**: `src/App.tsx` - Main application component that renders the full HTML document
- **Styling**: Tailwind CSS v4 configured via Vite plugin
- **Path Aliases**: `@/` maps to `src/` directory
- **React Compiler**: Configured with annotation mode for optimization
- **TypeScript**: Strict mode enabled with ESNext target

## Key Configuration

- React 19 with experimental types for Server Components
- Vite bundler with React and Tailwind plugins
