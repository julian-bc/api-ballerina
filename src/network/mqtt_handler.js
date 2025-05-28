import mqtt from "mqtt";

const MQTT_URI = process.env.MQTT_URI || "mqtt://localhost:1883";

export const client = mqtt.connect(MQTT_URI);

client.on("connect", () => {
  console.log("[🔗 CONNECTED] Connected to MQTT broker at " + MQTT_URI);
});

client.on('error', (error) => {
  console.error("[⛔ ERROR] MQTT connection error: ", error);
});

export const publishToTopic = (topic, message) => {
  client.publish(topic, JSON.stringify(message), (error) => {
    if (!error) {
      console.log("[✅ SUCCESS] Message published successfully!");
    } else {
      console.error("[❌ ERROR] Error publishing message: ", error);
    }
  });
}