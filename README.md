# AI Tool Directory

A modern, responsive directory for discovering and managing AI tools. Built with React, TypeScript, and Tailwind CSS.

## Features

- **Browse & Discover**: View a curated list of AI tools with details like category, pricing, and description.
- **Advanced Filtering**: Filter tools by Category (Chat, Image, Video, etc.) and Pricing (Free, Freemium, Paid).
- **Sorting**: Sort tools by Newest, Oldest, or Alphabetical order.
- **Search**: Real-time search by tool name, description, or tags.
- **Favorites**: Mark tools as favorites and filter to see only your saved items.
- **Dark Mode**: Fully supported dark mode with persistent preference.
- **Tool Management**: Add, edit, and delete tools directly from the UI (persisted to local storage).
- **Responsive Design**: Optimized for both desktop and mobile devices.

## Tech Stack

- **Frontend Framework**: [React](https://react.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Animations**: [Motion](https://motion.dev/) (Framer Motion)

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/ai-tool-directory.git
   cd ai-tool-directory
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:3000`.

## Deployment

This project is set up as a Single Page Application (SPA) and is ready for deployment on static hosting platforms like Netlify, Vercel, or GitHub Pages.

### Deploying to Netlify

1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket).
2. Log in to [Netlify](https://www.netlify.com/) and click **"New site from Git"**.
3. Select your repository.
4. Configure the build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
5. Click **"Deploy site"**.

*Note: A `public/_redirects` file is included to handle client-side routing on Netlify.*

## Project Structure

```
/
├── public/              # Static assets
├── src/
│   ├── components/      # Reusable UI components
│   │   ├── FilterSidebar.tsx
│   │   ├── Header.tsx
│   │   ├── ToolCard.tsx
│   │   └── ToolsModal.tsx
│   ├── data/            # Initial seed data
│   ├── services/        # Data services (LocalStorage)
│   ├── App.tsx          # Main application component
│   ├── main.tsx         # Entry point
│   └── types.ts         # TypeScript definitions
├── index.html           # HTML entry point
├── package.json         # Dependencies and scripts
├── tailwind.config.js   # Tailwind configuration
├── tsconfig.json        # TypeScript configuration
└── vite.config.ts       # Vite configuration
```

## License

This project is open source and available under the [MIT License](LICENSE).
