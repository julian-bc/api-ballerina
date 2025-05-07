import mqtt from "mqtt";

const MQTT_URI = process.env.MQTT_URI || "mqtt://localhost:1883";

export const client = mqtt.connect(MQTT_URI);

client.on("connect", () => {
  console.log("Connected to MQTT broker at " + MQTT_URI);
});

client.on('error', (error) => {
  console.error("MQTT connection error: ", error);
});

export const publishToTopic = (topic, message) => {
  client.publish(topic, JSON.stringify(message), (error) => {
    if (!error) {
      console.log("Message published successfully!");
    } else {
      console.error("Error publishing message: ", error);
    }
  });
}