import express from 'express';
import dotenv from 'dotenv';
import { collections, sensorTypes } from '../data/db.js';
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
    const result = await collections['oxygen'].find();
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
    
    const data = await filterByDate(calculatePastDate(date), collections['oxygen']);

    res.json(data);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

sensorTypes.forEach(sensorType => {
  const topic = `app/${sensorType}/query`;

  if (!collections[sensorType]) {
    console.warn(`No schema found for sensor type: ${sensorType}`);
    return;
  }

  client.subscribe(topic, async (error, message) => {
    if (!error) {
      try {
        const date = calculatePastDate(message.toString());
  
        if (!date) {
          console.error('Date missing or invalid')
          return;
        }
        
        const data = await filterByDate(date, collections[sensorType]);
        publishToTopic(`app/${sensorType}/response`, JSON.stringify(data));
      } catch (error) {
        console.error(`Error processing message: ${error}`);
      }
    } else {
      console.error(`Error subscribing to topic ${topic}: ${error}`);
    }
  });
});
