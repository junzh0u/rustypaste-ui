# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the web UI for [rustypaste](https://github.com/orhun/rustypaste), a minimal file upload/pastebin service. The UI is a React SPA that bundles into a single HTML file with no external dependencies, designed to be served directly by the rustypaste server.

## Common Commands

```bash
# Development (proxies API requests to paste.service.silvenga.com)
npm run dev

# Build production bundle (outputs single HTML file to dist/)
npm run build

# Lint
npm run lint

# Preview production build
npm run preview
```

**Note:** There are no tests configured in this project.

## Code Architecture

### Tech Stack

- **React 19** with TypeScript (strict mode)
- **Vite** with vite-plugin-singlefile for bundling
- **Tailwind CSS** with shadcn/ui components (Radix UI primitives)
- **react-hook-form** + Zod for form validation
- **TanStack React Table** for the file listing table
- **axios** for HTTP requests

### Directory Structure

```
src/
├── api/                    # HTTP API layer (uploadFile, getList, deleteFile, getVersion)
├── components/
│   ├── sections/           # Feature sections (upload-file/, history/, shorten-url/)
│   ├── shared/             # Reusable components (CopyLinkButton)
│   └── ui/                 # shadcn/ui base components
├── hooks/                  # Custom hooks (use-network-information, use-deep-compare-effect)
└── lib/utils.ts            # cn() utility for class merging
```

### Key Patterns

- **Authentication:** Token stored in localStorage via `useAuth` hook. `AuthGuard` wraps the app and shows login form when unauthenticated.
- **Upload State Machine:** Managed via `useReducer` in `useFileUploads.ts` with states: `queued → uploading → (uploaded | errored | canceled)`
- **File List Polling:** `useList` hook polls `/list` endpoint every second when authenticated
- **API Headers:** Authorization token sent via `authorization` header. Custom headers: `expire`, `filename`

### Build Output

The production build creates a single `dist/index.html` file with all CSS and JS inlined. This file is served by rustypaste as the landing page:

```toml
[landing_page]
file = "index.html"
content_type = "text/html; charset=utf-8"

[server]
expose_version = true
expose_list = true
```

### Development Proxy

The Vite dev server proxies these routes to `paste.service.silvenga.com`:
- `POST /` (uploads)
- `DELETE /:path`
- `GET /list`
- `GET /version`
