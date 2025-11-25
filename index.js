import cors from 'cors';
import express from 'express';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

let SHORTS = [
  { id: 1, videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', title: 'Big Buck Bunny', tags: ['animals', 'nature', 'classic'] },
  { id: 2, videoUrl: 'https://samplelib.com/lib/preview/mp4/sample-5s.mp4', title: 'Sample 5s', tags: ['sample', 'short'] },
  { id: 3, videoUrl: 'https://samplelib.com/lib/preview/mp4/sample-10s.mp4', title: 'Sample 10s', tags: ['sample', 'demo'] },
  { id: 4, videoUrl: 'https://samplelib.com/lib/preview/mp4/sample-15s.mp4', title: 'Sample 15s', tags: ['sample', 'longer'] },
  { id: 5, videoUrl: 'https://samplelib.com/lib/preview/mp4/sample-5s.mp4', title: 'Ocean Breeze', tags: ['sea', 'relax'] },
  { id: 6, videoUrl: 'https://samplelib.com/lib/preview/mp4/sample-10s.mp4', title: 'City Vibes', tags: ['city', 'travel'] },
  { id: 7, videoUrl: 'https://samplelib.com/lib/preview/mp4/sample-15s.mp4', title: 'Mountain Run', tags: ['mountain', 'sports'] },
  { id: 8, videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', title: 'Bunny Remix', tags: ['animals', 'fun'] },
];

function filterShorts(q, tag) {
  let items = SHORTS;
  if (q) {
    const s = String(q).toLowerCase();
    items = items.filter(it => it.title.toLowerCase().includes(s) || it.tags.some(t => t.toLowerCase().includes(s)));
  }
  if (tag) {
    const t = String(tag).toLowerCase();
    items = items.filter(it => it.tags.some(x => x.toLowerCase() === t));
  }
  return items.slice(0, 12);
}

app.get('/api/shorts', (req, res) => {
  const { q, tag } = req.query;
  res.set('Cache-Control', 'no-store');
  res.json(filterShorts(q, tag));
});

app.post('/api/shorts', (req, res) => {
  const body = req.body || {};
  if (!body.videoUrl) return res.status(400).json({ error: 'videoUrl required' });
  const nextId = SHORTS.length ? Math.max(...SHORTS.map(s => s.id)) + 1 : 1;
  const item = {
    id: nextId,
    videoUrl: String(body.videoUrl),
    title: String(body.title || 'Untitled'),
    tags: Array.isArray(body.tags) ? body.tags.map(String) : [],
  };
  SHORTS.unshift(item);
  res.status(201).json(item);
});

app.listen(PORT, () => {
  console.log(`Backend listening on http://localhost:${PORT}`);
});
