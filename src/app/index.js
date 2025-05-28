import { collections, sensorTypes } from '../data/db.js';
import { client, publishToTopic } from '../network/mqtt_handler.js';
import { filterByDate } from '../data/queries.js';
import { calculatePastDate } from '../utils/calculateDate.js';

sensorTypes.forEach(sensorType => {
  const topic = `app/${sensorType}/query`;

  if (!collections[sensorType]) {
    console.warn(`[⚠️ WARN] No schema found for sensor type: ${sensorType}`);
    return;
  }

  client.subscribe(topic, async (error, message) => {
    if (!error) {
      try {
        const date = calculatePastDate(message.toString());
  
        if (!date) {
          console.error('[❌ ERROR] Date missing or invalid')
          return;
        }
        
        const data = await filterByDate(date, collections[sensorType]);
        publishToTopic(`app/${sensorType}/response`, JSON.stringify(data));
      } catch (error) {
        console.error(`[❌ ERROR] Error processing message: ${error}`);
      }
    } else {
      console.error(`[⛔ ERROR] Error subscribing to topic ${topic}: ${error}`);
    }
  });
});
