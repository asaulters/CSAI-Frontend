# CSAI-Digest Frontend

A lightweight React + TypeScript landing page for CSAI-Digest, a weekly newsletter that brings you the most important developments in Customer Success and Artificial Intelligence.

## Features

- Responsive design with mobile-first approach
- Email subscription form with Mailchimp integration
- Smooth scrolling navigation
- Accessible UI components

## Tech Stack

- React 18
- TypeScript
- Vite
- Vanilla CSS with CSS variables

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. Clone the repository
2. Navigate to the project directory
3. Install dependencies:

```bash
npm i
```

### Development

To start the development server:

```bash
npm run dev
```

This will start the development server at `http://localhost:5173`.

### Building for Production

To build the project for production:

```bash
npm run build
```

This will generate a `dist` folder with the production-ready files.

### Preview Production Build

To preview the production build locally:

```bash
npm run preview
```

## Environment Variables

The project uses the following environment variables:

- `VITE_MC_API_KEY`: Mailchimp API key
- `VITE_MC_DC`: Mailchimp data center
- `VITE_MC_AUDIENCE_ID`: Mailchimp audience ID

These should be defined in a `.env` file in the project root.

## Deployment

This project is configured to be deployed as a static site on Render.

## License

This project is licensed under the MIT License.
