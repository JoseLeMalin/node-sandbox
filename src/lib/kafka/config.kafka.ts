import type { EachMessagePayload } from "kafkajs";
import { Kafka } from "kafkajs";

const kafka = new Kafka({
  clientId: "my-app",
  brokers: ["localhost:9092", "localhost:8082"],
});

const producer = kafka.producer();

export const testProducer = async () => {
  await producer.connect();
  await producer.send({
    topic: "test-topic",
    messages: [{ value: "Hello KafkaJS user!" }],
  });
  await producer.send({
    topic: "test-topic",
    messages: [{ value: "Hello KafkaJS user 1!" }],
  });
  await producer.send({
    topic: "test-topic",
    messages: [{ value: "Hello KafkaJS user! 2" }],
  });
  await producer.send({
    topic: "test-topic",
    messages: [{ value: "Hello KafkaJS user! 3" }],
  });
  await producer.send({
    topic: "test-topic",
    messages: [{ value: "Hello KafkaJS user! 4" }],
  });

  await producer.disconnect();
};

export const clientreceiver = async () => {
  const consumer = kafka.consumer({ groupId: "test-group" });

  await consumer.connect();
  await consumer.subscribe({ topic: "test-topic", fromBeginning: true });

  let i = 0;
  await consumer.run({
    eachMessage: async ({ topic, partition, message }: EachMessagePayload) => {
      if (!message.value) {
        console.log("null");
        return;
      }
      console.log({
        value: `Test de message: ${i} ${message.value.toString()}`,
      });
      i += 1;
    },
  });
};
