# Short-flix Backend (Express)

Simple Express API serving a small list of short videos.

## Stack

- Node.js + Express
- In-memory data (no database)

## Endpoints

- GET `/api/shorts`
  - Query: `q` (search), `tag` (exact tag filter, lowercase)
  - Returns 5–10 items
- POST `/api/shorts`
  - Body: `{ videoUrl: string, title?: string, tags?: string[] }`
  - Adds an in-memory item (resets on restart)

## CORS

Configured to allow:

- `http://localhost:5173`
- Your deployed frontend origin (e.g. Netlify site)

Update CORS origins in `index.js` if your frontend domain changes.

## Local Development

- `npm install`
- `npm run dev`
- API runs at `http://localhost:3001`

## Deploy

- Vercel/Render/Railway/Fly/EC2 all work
- Ensure CORS includes your production frontend origin
