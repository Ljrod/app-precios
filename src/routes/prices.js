import { Router } from 'express';
import { getPrices } from '../services/aggregator.js';

const router = Router();

router.get('/prices', async (req, res) => {
  const { title } = req.query;
  if (!title) return res.status(400).json({ error: 'title required' });

  try {
    const data = await getPrices(title);
    res.json(data);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'server_error' });
  }
});

export default router;