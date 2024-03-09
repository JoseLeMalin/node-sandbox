import {
  Kafka,
  Message,
  Producer,
  ProducerBatch,
  TopicMessages,
} from "kafkajs";
import { ApiError, messageCode } from "../../utils/express/errors";
// Based on https://kafka.js.org/docs/producer-example

interface CustomMessageFormat {
  a: string;
}

export const ProducerFactory = () => {
  const newProducer = () => {
    if (!process.env.KAFKA_PRODUCER_CLIENTID || !process.env.KAFKA_BROKER)
      throw new ApiError(
        500,
        messageCode.MISSING_ENV_VARIABLE,
        "Missing Kafka Producer ClientId",
      );
    const kafka = new Kafka({
      clientId: process.env.KAFKA_PRODUCER_CLIENTID,
      brokers: [process.env.KAFKA_BROKER],
    });

    return kafka.producer();
  };

  const start = async (producer: Producer) => {
    try {
      await producer.connect();
    } catch (error) {
      console.log("Error connecting the producer: ", error);
    }
  };

  const sendMessages = async (producer: Producer, messages: Message[]) => {
    if (!process.env.KAFKA_TOPIC)
      throw new ApiError(
        500,
        messageCode.MISSING_ENV_VARIABLE,
        "Missing Kafka Consumer ClientId",
      );
    await producer.send({
      topic: process.env.KAFKA_TOPIC,
      messages,
    });
  };

  const sendMessagesBatch = async (
    producer: Producer,
    messages: CustomMessageFormat[],
  ): Promise<void> => {
    if (!process.env.KAFKA_TOPIC)
      throw new ApiError(
        500,
        messageCode.MISSING_ENV_VARIABLE,
        "Missing Kafka Consumer ClientId",
      );
    const kafkaMessages: Message[] = messages.map((message) => {
      return {
        value: JSON.stringify(message),
      };
    });

    const topicMessages: TopicMessages = {
      topic: process.env.KAFKA_TOPIC,
      messages: kafkaMessages,
    };

    const batch: ProducerBatch = {
      topicMessages: [topicMessages],
    };

    await producer.sendBatch(batch);
  };

  const shutdown = async (producer: Producer): Promise<void> => {
    await producer.disconnect();
  };

  // const producer = newProducer();
  return {
    // producer,
    newProducer,
    start,
    shutdown,
    sendMessages,
    sendMessagesBatch,
  };
};

export const ProducerFactoryBis = (clientId: string, brokers: string[]) => {
  const newProducer = () => {
    console.log("Do we come here ?");
    
    const kafka = new Kafka({
      clientId: clientId,
      brokers: brokers,
    });
    return kafka.producer();
  };
  const producer = newProducer();
  const start = async () => {
    try {
      console.log("trigger start ?");
      await producer.connect();
    } catch (error) {
      console.log("Error connecting the producer: ", error);
    }
  };

  const sendMessages = async (messages: Message[]) => {
    if (!process.env.KAFKA_TOPIC)
      throw new ApiError(
        500,
        messageCode.MISSING_ENV_VARIABLE,
        "Missing Kafka Consumer ClientId",
      );
      console.log("Reaching here sendMessages?");
    await producer.send({
      topic: process.env.KAFKA_TOPIC,
      messages,
    });
  };

  const sendMessagesBatch = async (
    messages: CustomMessageFormat[],
  ): Promise<void> => {
    if (!process.env.KAFKA_TOPIC)
      throw new ApiError(
        500,
        messageCode.MISSING_ENV_VARIABLE,
        "Missing Kafka Consumer ClientId",
      );
    const kafkaMessages: Message[] = messages.map((message) => {
      return {
        value: JSON.stringify(message),
      };
    });

    const topicMessages: TopicMessages = {
      topic: process.env.KAFKA_TOPIC,
      messages: kafkaMessages,
    };

    const batch: ProducerBatch = {
      topicMessages: [topicMessages],
    };

    await producer.sendBatch(batch);
  };

  const shutdown = async (): Promise<void> => {
    await producer.disconnect();
  };

  // const producer = newProducer(process.env.KAFKA_PRODUCER_CLIENTID, [
  //   process.env.KAFKA_BROKER,
  // ]);

  return {
    newProducer,
    start,
    shutdown,
    sendMessages,
    sendMessagesBatch,
  };
};

export default class ProducerFactoryModel {
  private producer: Producer;

  constructor() {
    this.producer = this.createProducer();
  }

  public async start(): Promise<void> {
    try {
      await this.producer.connect();
    } catch (error) {
      console.log("Error connecting the producer: ", error);
    }
  }

  public async shutdown(): Promise<void> {
    await this.producer.disconnect();
  }

  public async sendBatch(messages: Array<CustomMessageFormat>): Promise<void> {
    const kafkaMessages: Array<Message> = messages.map((message) => {
      return {
        value: JSON.stringify(message),
      };
    });

    const topicMessages: TopicMessages = {
      topic: "producer-topic",
      messages: kafkaMessages,
    };

    const batch: ProducerBatch = {
      topicMessages: [topicMessages],
    };

    await this.producer.sendBatch(batch);
  }

  private createProducer(): Producer {
    const kafka = new Kafka({
      clientId: "producer-client",
      brokers: ["localhost:9092"],
    });

    return kafka.producer();
  }
}
