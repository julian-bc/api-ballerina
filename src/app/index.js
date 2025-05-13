import express from 'express';
import dotenv from 'dotenv';
import { Oxygen } from '../data/db.js';
import { client, publishToTopic } from '../network/mqtt_handler.js';
import { filterByDate } from '../data/queries.js';
import { calculatePastDate } from '../utils/calculateDate.js';

dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.get('/lorawan/ox', async (_req, res) => {
  try {
    const result = await Oxygen.find();
    res.json(result);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
})

app.get('/lorawan/ox/filter', async (req, res) => {
  try {
    const { date } = req.query;

    if (!date) return res.status(400).json({ error: 'Date is required' });
    
    const data = await filterByDate(calculatePastDate(date));

    res.json(data);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

client.subscribe('app/query', async (error, message) => {
  if (!error) {
    try {
      const date = calculatePastDate(message.toString());

      if (!date) {
        console.error('date missing')
      }
      
      const data = await filterByDate(date);

      publishToTopic('app/reponse', JSON.stringify(data));
    } catch (error) {
      console.error('Error processing message: ', error);
    }
  } else {
    console.error('Error subscribing to topic: ', error);
  }
});
