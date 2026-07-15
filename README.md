<div align="center">

# Social Feed Frontend

A modern, production-ready social feed UI built with React 18, TypeScript, Redux Toolkit, and RTK Query.

[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?logo=typescript)](https://www.typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite)](https://vitejs.dev)
[![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-2.12-764ABC?logo=redux)](https://redux-toolkit.js.org)
[![License](https://img.shields.io/badge/License-UNLICENSED-lightgrey)](#)

</div>

---

## Overview

A complete social feed frontend with authentication, infinite scroll, cursor-based pagination, optimistic updates, and a responsive three-column layout. The app communicates with a [NestJS backend API](../backend/README.md) via a custom Axios instance with automatic token refresh.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| UI Library | React 18 (Concurrent) |
| Language | TypeScript 5.7 (strict mode) |
| Build Tool | Vite 5 |
| State Management | Redux Toolkit |
| Data Fetching | RTK Query (with custom Axios base query) |
| HTTP Client | Axios 1.18 (with interceptor-based token refresh) |
| Forms | React Hook Form + Zod 4 |
| Routing | React Router DOM 7 |
| Notifications | React Hot Toast |
| Styling | Bootstrap CSS + Custom CSS |
| Fonts | Google Fonts (Poppins) |

## Features

### Authentication
- Login / Registration with Zod schema validation
- JWT access + refresh token management via localStorage
- Automatic token refresh with request queue (no lost requests during refresh)
- Route guards for protected/public routes
- Persistent login on page reload (auto-fetch user on mount)

### Social Feed
- **Create Post**: Rich form with content, visibility toggle (Public/Private), and optional image upload (multipart FormData)
- **Infinite Scroll**: IntersectionObserver-based sentinel with smart scroll parent detection
- **Cursor Pagination**: Stable cursor-based pagination (10 posts per page) with merge-based cache updates
- **Optimistic Updates**: Create, edit, delete, and like/unlike all update the UI instantly with rollback on failure

### Posts
- Full CRUD: Create, Read, Edit, Delete posts
- Image upload with preview, remove, and Cloudinary integration
- Owner-only Edit/Delete via dropdown menu
- Visibility badges (Public/Private)
- Time-ago formatting (just now, 5m, 3h, 2d, 1w)

### Likes
- Toggle like/unlike on posts with optimistic state flip
- Toggle like/unlike on comments and replies (unified mutation)
- Like count display with visual thumbs-up icon (filled blue when liked)
- Likers modal with infinite scroll list of users who liked a post

### Comments & Replies
- Two-level comment system (comments on posts, replies on comments)
- Infinite scroll for both comments and replies
- Create comment / reply forms with Enter-to-submit
- Like button on each comment and reply
- "View N replies" expandable section

### Responsive Layout
- **Desktop**: Three-column layout (left sidebar, feed center, right sidebar)
- **Mobile**: Full-width feed with bottom navigation bar
- Lazy-loaded route-level code splitting via `React.lazy` + `Suspense`



Create a `.env` file in the project root:

```bash
VITE_API_BASE_URL=http://localhost:3005/api/v1
```

### Development

```bash
npm run dev
```

The Vite dev server runs on `http://localhost:5173` and proxies `/api` requests to the backend at `http://localhost:3000`.

### Production Build

```bash
npm run build
npm run preview
```

### Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start Vite dev server with HMR |
| `npm run build` | Type-check with `tsc -b` then build with Vite |
| `npm run lint` | Run ESLint (zero warnings policy) |
| `npm run preview` | Preview production build locally |

## Routes

| Path | Component | Auth | Description |
|------|-----------|------|-------------|
| `/` | Redirect | — | Redirects to `/login` |
| `/login` | Login | Public | Login page |
| `/register` | Register | Public | Registration page |
| `/feed` | Feed | Protected | Main social feed |

All routes are lazy-loaded via `React.lazy()` with a `Suspense` fallback.

## Project Structure

```
frontend/
├── public/
│   ├── css/                        # Bootstrap + custom CSS
│   ├── images/                     # Static images
│   └── js/                         # Bootstrap JS
├── src/
│   ├── main.tsx                    # Entry point
│   ├── App.tsx                     # Router + lazy routes
│   ├── app/                        # Redux store
│   ├── features/                   # Feature modules (auth, posts, comments, likes)
│   ├── shared/                     # Shared API, types, utils, components
│   ├── hooks/                      # Custom hooks
│   ├── utils/                      # Utility functions
│   ├── components/                 # UI components (feed, comments, shared)
│   └── pages/                      # Page components
├── index.html
├── vite.config.ts
├── tsconfig.json
├── package.json
└── .env
```

## License

UNLICENSED
