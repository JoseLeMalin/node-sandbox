import { Kafka } from "kafkajs";

if (!process.env.CLIENT_ID)
  throw new Error("Kafka Client Id can not init Kafka Instance");
if (!process.env.KAFKA_BROKER)
  throw new Error("Kafka Broker address can not init Kafka Instance");

export const kafka = new Kafka({
  clientId: process.env.CLIENT_ID,
  brokers: [process.env.KAFKA_BROKER] || ["localhost:9092", "localhost:8082"],
});

// export const testProducer = async () => {
//   await producer.connect();
//   await producer.send({
//     topic: "test-topic",
//     messages: [{ value: "Hello KafkaJS user!" }],
//   });
//   await producer.send({
//     topic: "test-topic",
//     messages: [{ value: "Hello KafkaJS user 1!" }],
//   });
//   await producer.send({
//     topic: "test-topic",
//     messages: [{ value: "Hello KafkaJS user! 2" }],
//   });
//   await producer.send({
//     topic: "test-topic",
//     messages: [{ value: "Hello KafkaJS user! 3" }],
//   });
//   await producer.send({
//     topic: "test-topic",
//     messages: [{ value: "Hello KafkaJS user! 4" }],
//   });
//
//   await producer.disconnect();
// };
//
// export const clientreceiver = async () => {
//   const consumer = kafka.consumer({ groupId: "test-group" });
//
//   await consumer.connect();
//   await consumer.subscribe({ topic: "test-topic", fromBeginning: true });
//
//   let i = 0;
//   await consumer.run({
//     eachMessage: async ({ message }: EachMessagePayload) => {
//       if (!message.value) {
//         console.log("null");
//         return;
//       }
//       console.log({
//         value: `Test de message: ${i} ${message.value.toString()}`,
//       });
//       i += 1;
//     },
//   });
// };
