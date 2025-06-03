import { collections, sensorTypes } from '../data/db.js';
import { client, publishToTopic } from '../network/mqtt_handler.js';
import { filterByDate } from '../data/queries.js';
import { calculatePastDate } from '../utils/calculateDate.js';

sensorTypes.forEach(sensorType => {
  const topic = `backend/${sensorType}/req`;

  if (!collections[sensorType]) {
    console.warn(`[⚠️ WARN] No schema found for sensor type: ${sensorType}`);
    return;
  }

  client.subscribe(topic)
  .then(() => {
    console.log(`[📬 SUBSCRIBED] Subscribed to topic: ${topic}`);
  })
  .catch(err => {
    console.error(`[❌ ERROR] Failed to subscribe to topic ${topic}: ${err}`);
  });
})

client.on("message", async (topic, message) => {
  console.log(`[📬 MESSAGE] Received message on topic ${topic}: ${message.toString()}`);
  try {
        const date = calculatePastDate(message.toString());
        console.log(`[📅 DATE] Calculated date: ${date}`);
  
        if (!date) {
          console.error('[❌ ERROR] Date missing or invalid')
          return;
        }
        const schema = topic.charAt(0).toUpperCase() +topic.slice(1);
        
        const data = await filterByDate(date, schema);
        const topicToPublish = topic.replace('/req', '/res');
        
        setTimeout(() => {
          publishToTopic(topicToPublish, JSON.stringify(data));
        }, 1300);
        
        

      } catch (error) {
        console.error(`[❌ ERROR] Error processing message: ${error}`);
      }
  
  
});
