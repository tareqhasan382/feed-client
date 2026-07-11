# Social Feed Frontend

Frontend application for the **Full Stack Engineer Assessment**.

Built with **React.js**, **TypeScript**, **Vite**, **Tailwind CSS**, and **React Router DOM**.

---

## Tech Stack

- React.js
- TypeScript
- Vite
- Tailwind CSS
- React Router DOM
- Axios
- React Hook Form
- Zod

---

## Features

### Authentication

- User Login
- User Registration
- Protected Routes
- JWT Authentication
- Persistent Login

---

### Feed

- View Public Posts
- Create Post
- Upload Image
- Private/Public Post Visibility
- Like / Unlike Posts
- Comment on Posts
- Reply to Comments
- Like / Unlike Comments
- Like / Unlike Replies
- View Users Who Liked Posts
- View Users Who Liked Comments
- View Users Who Liked Replies

---

## UI Requirements

This project strictly follows the provided HTML/CSS design.

- No alternative UI
- Pixel-perfect implementation
- Fully Responsive
- Mobile Friendly
- Tablet Friendly
- Desktop Friendly

---

## Routing

| Route | Access |
|--------|--------|
| /login | Public |
| /register | Public |
| /feed | Protected |

---

## Performance

- Lazy Loading
- Route Code Splitting
- Image Lazy Loading
- API Request Caching
- Optimized Rendering
- Memoization where appropriate

---

## Validation

Frontend validation is implemented using:

- React Hook Form
- Zod

Validation is performed before every API request.

---

## Error Handling

The application provides:

- Friendly error messages
- Loading states
- Empty states
- Network error handling
- Disabled submit buttons while processing

---

## Security

- JWT Authentication
- Protected Routes
- Token-based Authorization
- Secure API Requests

---

## Responsive Design

Optimized for:

- Mobile
- Tablet
- Desktop

---

## Installation

```bash
git clone <repository-url>

cd social-feed-web

npm install
```

---

## Environment Variables

Create a `.env` file.

```
VITE_API_BASE_URL=http://localhost:5000/api
```

---

## Run Development Server

```bash
npm run dev
```

---

## Build

```bash
npm run build
```

---

## Preview

```bash
npm run preview
```

---

## Design Notes

The UI implementation follows the provided assessment design.

No visual redesign has been introduced.

Only responsiveness and code organization have been improved while preserving the original layout.

---

## Code Quality

- TypeScript
- Reusable Components
- Custom Hooks
- Clean Folder Structure
- Route-based Code Splitting
- DRY Principle
- Maintainable Code

---

## Future Improvements

- Dark Mode
- Infinite Scrolling
- Optimistic UI Updates
- Accessibility Enhancements

---

## Author

**Tareq Hasan**

Full Stack Developer
