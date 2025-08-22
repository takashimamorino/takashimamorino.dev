# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Core Development

- `bun --bun run dev` - Start development server (uses @lazarv/react-server)
- `bun --bun run build` - Build for production (output in `.react-server` directory)
- `bun --bun start` - Run production server

### Code Quality

- `bun typecheck` - Run TypeScript type checking
- `bun format` - Format code with Biome
- `bun lint` - Lint code with OxLint

## Architecture

This is a blog application built with React Server Components using [@lazarv/react-server](https://react-server.dev) framework.

### Project Structure

- **`src/app/`** - Application pages and layouts
  - `layout.tsx` - Root layout with header and footer
  - `page.tsx` - Home page with blog post list
  - `posts/[slug]/page.tsx` - Individual blog post pages
- **`src/lib/`** - Utility functions and core logic
  - `posts.ts` - Markdown processing and post management
- **`src/styles/`** - CSS files
  - `prose.css` - Typography styles for blog content
- **`posts/`** - Markdown blog posts with frontmatter

### Key Features

- **Markdown Processing**: Uses `remark` and `gray-matter` for parsing Markdown files
- **Syntax Highlighting**: Code blocks styled with `shiki` using `catppuccin-mocha` theme
- **Styling**: Tailwind CSS v4 with Typography plugin
- **TypeScript**: Strict mode enabled with ESNext target
- **Code Quality**: Biome formatter, OxLint linter, Husky pre-commit hooks

### Blog Post Format

Posts are stored as Markdown files in the `posts/` directory with frontmatter:

```markdown
---
title: Post Title
published: YYYY-MM-DD
---

Post content...
```

## Key Configuration

- React Server Components with experimental types
- Vite bundler with React and Tailwind plugins
- No Next.js dependencies - pure React Server Components
- Relative imports (no path aliases)
