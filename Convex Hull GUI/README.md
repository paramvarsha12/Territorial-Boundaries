# Convex Hull GUI - Territorial Boundaries Visualization

A modern web application for defining and visualizing territorial boundaries using the Convex Hull algorithm. This application allows users to input GPS coordinates, process them using the Convex Hull algorithm, and visualize the results on an interactive map.

## Features

- Interactive map interface using Google Maps API
- GPS coordinate input and management
- Convex Hull algorithm implementation
- Real-time boundary visualization
- 3D effects and modern UI
- Multi-page application with About section
- Responsive design for all devices

## Tech Stack

- Frontend: React with TypeScript
- Backend: Node.js with Express
- Maps: Google Maps API
- Styling: Tailwind CSS
- 3D Effects: Three.js

## Setup Instructions

1. Clone the repository
2. Install dependencies:
   ```bash
   npm run install-all
   ```
3. Create a `.env` file in the backend directory with your Google Maps API key:
   ```
   GOOGLE_MAPS_API_KEY=your_api_key_here
   ```
4. Start the application:
   ```bash
   npm start
   ```

## Project Structure

```
convex-hull-gui/
├── frontend/           # React frontend application
├── backend/           # Node.js backend server
└── README.md
```

## License

MIT License 