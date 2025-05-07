import express from 'express';
import dotenv from 'dotenv';
import { filterByDateAndMetric, Sensors } from '../data/db.js';
import { metrics } from '../utils/metrics.js';
import { client, publishToTopic } from '../network/mqtt_handler.js';

dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.get('/lorawan/ox', async (_req, res) => {
  try {
    const result = await Sensors.find({metric: metrics.OXYGEN});
    res.json(result);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
})

app.get('/lorawan/ox/filter', async (req, res) => {
  try {
    const { date } = req.query; // 2025-05-06T00:00:00Z
    if (!date) return res.status(400).json({ error: 'Date is required' });
    
    const data = await filterByDateAndMetric(date, metrics.OXYGEN)

    res.json(data);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

client.subscribe('app/query', async (error, message) => {
  if (!error) { // 2025-05-06T00:00:00Z
    try {
      const { date , metric } = JSON.parse(message.toString());

      if (!date || !metric) {
        console.error('Invalid payload: date or metric missing')
      }
      
      const data = await filterByDateAndMetric(date, metric);

      publishToTopic('app/reponse', JSON.stringify(data));
    } catch (error) {
      console.error('Error processing message: ', error);
    }
  } else {
    console.error('Error subscribing to topic: ', error);
  }
});
