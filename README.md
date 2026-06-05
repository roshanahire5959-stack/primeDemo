# TV Show Dashboard

A modern, responsive web application for browsing and exploring TV shows using the TVMaze API. Built with Vue 3, TypeScript, and Tailwind CSS.

## Features

- 📺 **Browse TV Shows**: View a comprehensive grid of TV shows with poster images
- 🔍 **Detailed Information**: Click on any show to see detailed information including:
  - Show description and summary
  - Genres and ratings
  - Network, premiere date, and status
  - Runtime and language information

## Tech Stack

- **Framework**: [Vue 3](https://vuejs.org/) with Composition API
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite](https://vite.dev/)
- **Routing**: [Vue Router](https://router.vuejs.org/)
- **State Management**: [Pinia](https://pinia.vuejs.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Testing**: [Vitest](https://vitest.dev/) + [Vue Test Utils](https://test-utils.vuejs.org/)
- **Linting**: [ESLint](https://eslint.org/) with [Oxlint](https://oxc.rs/)
- **API**: [TVMaze API](https://www.tvmaze.com/api)

## Project Structure

```
tvshow-dashboard/
├── public/                 # Static assets
├── src/
│   ├── components/         # Vue components
│   │   ├── AppHeader.vue   # Application header
│   │   ├── ShowCard.vue    # Individual show card component
│   │   └── ShowList.vue    # Grid of show cards
│   ├── router/             # Vue Router configuration
│   │   └── index.ts        # Route definitions
│   ├── types/              # TypeScript type definitions
│   │   └── index.ts        # TVShow interface
│   ├── views/              # Page-level components
│   │   ├── HomeView.vue    # Home page with show grid
│   │   └── ShowView.vue    # Show detail page
│   ├── __tests__/          # Unit tests
│   │   └── App.spec.ts
│   ├── App.vue             # Root component
│   ├── main.ts             # Application entry point
│   └── style.css           # Global styles
├── index.html              # HTML entry point
├── package.json            # Dependencies and scripts
├── vite.config.ts          # Vite configuration
├── vitest.config.ts        # Vitest configuration
├── tsconfig.json           # TypeScript configuration
└── eslint.config.ts        # ESLint configuration
```

## API Reference

This application uses the [TVMaze API](https://www.tvmaze.com/api) to fetch TV show data.

### Endpoints Used

- `GET https://api.tvmaze.com/shows` - Fetch all TV shows
- `GET https://api.tvmaze.com/shows/:id` - Fetch a specific show by ID

No API key is required.

## Prerequisites

- Node.js: `^20.19.0 || >=22.12.0`
- npm

## Getting Started

### Installation

```sh
npm install
```

### Development

Start the development server with hot-reload:

```sh
npm run dev
```

The application will be available at `http://localhost:5173`.

### Building for Production

Type-check, compile, and minify for production:

```sh
npm run build
```

Preview the production build locally:

```sh
npm run preview
```

### Testing

Run unit tests with Vitest:

```sh
npm run test:unit
```

### Linting and Formatting

Lint and fix code issues:

```sh
npm run lint
```

Format code with Oxfmt:

```sh
npm run format
```

### Type Checking

Run TypeScript type checking:

```sh
npm run type-check
```
# primeDemo
