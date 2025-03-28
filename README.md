# Feeds Reader

A modern RSS/feeds reader application built with Next.js, TypeScript, Tailwind CSS, and ShadcnUI.

## Features

- Three-column layout for desktop screens (>1280px)
  - First column: Categories and sites
  - Second column: Feed items from selected category/site
  - Third column: Content of selected feed item
- Single column layout for mobile screens (≤1280px)
- URL fragment-based navigation (no page refreshes)
- Dark mode support
- Responsive design

## Tech Stack

- **Next.js 15+**: React framework
- **TypeScript**: Type safety
- **Tailwind CSS**: Utility-first CSS
- **Shadcn UI**: UI component library
- **date-fns**: Date formatting

## Getting Started

```bash
# Install dependencies
yarn install

# Run development server
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## URL Navigation

- **Home**: `http://localhost:3000/`
- **Category**: `http://localhost:3000/#category=tech`
- **Site**: `http://localhost:3000/#site=hn`
- **Item**: `http://localhost:3000/#item=hn-item-1`

## Project Structure

- `src/components/`: UI components
- `src/data/`: Mock data
- `src/types.ts`: TypeScript interfaces
- `public/`: Static assets

## License

MIT
