import mqtt from "mqtt";

const MQTT_URI = process.env.PORT || "mqtt://localhost:1883";

export const client = mqtt.connect(MQTT_URI);

client.on("connect", () => {
  console.log("Connected to MQTT broker at " + MQTT_URI);
});

client.on('error', (error) => {
  console.error("MQTT connection error: ", error);
});