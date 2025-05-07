import express from 'express';
import dotenv from 'dotenv';
import { Oxygen } from './db.js';

dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.get('/lorawan/ox', async (_req, res) => {
  try {
    const result = await Oxygen.find({});
    res.json(result);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
})

app.get('/lorawan/ox/search', async (req, res) => {
  try {
    const { date } = req.query; // 2025-05-06T00:00:00Z
    if (!date) return res.status(400).json({ error: 'Date is required' });

    const start = new Date(date);
    const end = new Date();

    const result = await Oxygen.find({
      createdAt: { $gte: start, $lte: end },
    });

    res.json(result);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});