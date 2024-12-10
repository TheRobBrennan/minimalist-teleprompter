# Teleprompter App

Design a modern, minimalist teleprompter web app using Next.js and shadcn/ui components. The app should be distraction-free with these key features:

Main View:

- Large input text box for users to type or paste their script
- Centered "Start the teleprompter" button below the text box

Teleprompter View:

- Full-screen text display
- Bottom navigation bar (important: must be at bottom to preserve valuable screen space for teleprompter text) containing:
  1. Play/Pause button
  2. Text size slider (px)
  3. Margin slider (0-40% screen width)
  4. Rolling speed slider
  5. Text alignment toggle (center/left)
  6. Theme switch (dark/light mode with moon/sun icons)
  - Dark mode: black background, white text
  - Light mode: white background, black text

The design should be clean, modern, and completely free of distractions. The bottom placement of controls is crucial as most users have cameras at the top of their screen.

## Technical details

We have already created an empty Next.js project with the following package.json:

```
{
  "name": "teleprompter",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "next": "15.0.4"
  },
  "devDependencies": {
    "typescript": "^5",
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "postcss": "^8",
    "tailwindcss": "^3.4.1",
    "eslint": "^8",
    "eslint-config-next": "15.0.4"
  }
}
```