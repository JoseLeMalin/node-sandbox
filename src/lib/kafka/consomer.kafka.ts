import {
  ConsumerSubscribeTopics,
  EachBatchPayload,
  Kafka,
  EachMessagePayload,
} from "kafkajs";
import { ApiError, messageCode } from "../../utils/express/errors";

export const ConsumerFactory = () => {
  const newConsumer = () => {
    if (
      !process.env.KAFKA_CONSUMER_CLIENTID ||
      !process.env.KAFKA_BROKER ||
      !process.env.KAFKA_GROUPID
    )
      throw new ApiError(
        500,
        messageCode.MISSING_ENV_VARIABLE,
        "Missing Kafka Consumer ClientId",
      );
    const kafka = new Kafka({
      clientId: process.env.KAFKA_CONSUMER_CLIENTID,
      brokers: [process.env.KAFKA_BROKER],
    });

    return kafka.consumer({ groupId: process.env.KAFKA_GROUPID });
  };

  const start = async () => {
    if (!process.env.KAFKA_TOPIC)
      throw new ApiError(
        500,
        messageCode.MISSING_ENV_VARIABLE,
        "Missing Kafka Consumer ClientId",
      );
    const topic: ConsumerSubscribeTopics = {
      topics: ["example-topic"],
      fromBeginning: false,
    };

    try {
      await consumer.connect();
      await consumer.subscribe(topic);

      await consumer.run({
        eachMessage: async (messagePayload: EachMessagePayload) => {
          const { topic, partition, message } = messagePayload;
          const prefix = `${topic}[${partition} | ${message.offset}] / ${message.timestamp}`;
          console.log(`- ${prefix} ${message.key}#${message.value}`);
        },
      });
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const startBatchConsumer = async (): Promise<void> => {
    if (!process.env.KAFKA_TOPIC)
      throw new ApiError(
        500,
        messageCode.MISSING_ENV_VARIABLE,
        "Missing Kafka Consumer ClientId",
      );
    const topic: ConsumerSubscribeTopics = {
      topics: [process.env.KAFKA_TOPIC],
      fromBeginning: false,
    };

    try {
      await consumer.connect();
      await consumer.subscribe(topic);
      await consumer.run({
        eachBatch: async (eachBatchPayload: EachBatchPayload) => {
          const { batch } = eachBatchPayload;
          for (const message of batch.messages) {
            const prefix = `${batch.topic}[${batch.partition} | ${message.offset}] / ${message.timestamp}`;
            console.log(`- ${prefix} ${message.key}#${message.value}`);
          }
        },
      });
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const shutdown = async (): Promise<void> => {
    await consumer.disconnect();
  };

  // const messageProcessor: ExampleMessageProcessor;
  const consumer = newConsumer();
  return {
    consumer,
    newConsumer,
    start,
    shutdown,
    startBatchConsumer,
  };
};
export const ConsumerFactoryBis = (
  clientId: string,
  brokers: string[],
  groupId: string,
) => {
  const newConsumer = () => {
    const kafka = new Kafka({
      clientId,
      brokers,
    });

    return kafka.consumer({ groupId });
  };
  // const messageProcessor: ExampleMessageProcessor;
  const consumer = newConsumer();
  const start = async () => {
    if (!process.env.KAFKA_TOPIC)
      throw new ApiError(
        500,
        messageCode.MISSING_ENV_VARIABLE,
        "Missing Kafka Consumer ClientId",
      );
    const topic: ConsumerSubscribeTopics = {
      topics: [process.env.KAFKA_TOPIC],
      fromBeginning: false,
    };

    try {
      await consumer.connect();
      await consumer.subscribe(topic);

      await consumer.run({
        eachMessage: async (messagePayload: EachMessagePayload) => {
          const { topic, partition, message } = messagePayload;
          const prefix = `${topic}[${partition} | ${message.offset}] / ${message.timestamp}`;
          console.log(`- ${prefix} ${message.key}#${message.value}`);
        },
      });
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const startBatchConsumer = async (): Promise<void> => {
    if (!process.env.KAFKA_TOPIC)
      throw new ApiError(
        500,
        messageCode.MISSING_ENV_VARIABLE,
        "Missing Kafka Consumer ClientId",
      );
    const topic: ConsumerSubscribeTopics = {
      topics: [process.env.KAFKA_TOPIC],
      fromBeginning: false,
    };

    try {
      await consumer.connect();
      await consumer.subscribe(topic);
      await consumer.run({
        eachBatch: async (eachBatchPayload: EachBatchPayload) => {
          const { batch } = eachBatchPayload;
          for (const message of batch.messages) {
            const prefix = `${batch.topic}[${batch.partition} | ${message.offset}] / ${message.timestamp}`;
            console.log(`- ${prefix} ${message.key}#${message.value}`);
          }
        },
      });
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const shutdown = async (): Promise<void> => {
    await consumer.disconnect();
  };

  return {
    consumer,
    newConsumer,
    start,
    shutdown,
    startBatchConsumer,
  };
};

// export default class ExampleConsumerClass {
//   private kafkaConsumer: Consumer;
//   private messageProcessor: ExampleMessageProcessor;
//
//   public constructor(messageProcessor: ExampleMessageProcessor) {
//     this.messageProcessor = messageProcessor;
//     this.kafkaConsumer = this.createKafkaConsumer();
//   }
//
//   public async startConsumer(): Promise<void> {
//     const topic: ConsumerSubscribeTopics = {
//       topics: ["example-topic"],
//       fromBeginning: false,
//     };
//
//     try {
//       await this.kafkaConsumer.connect();
//       await this.kafkaConsumer.subscribe(topic);
//
//       await this.kafkaConsumer.run({
//         eachMessage: async (messagePayload: EachMessagePayload) => {
//           const { topic, partition, message } = messagePayload;
//           const prefix = `${topic}[${partition} | ${message.offset}] / ${message.timestamp}`;
//           console.log(`- ${prefix} ${message.key}#${message.value}`);
//         },
//       });
//     } catch (error) {
//       console.log("Error: ", error);
//     }
//   }
//
//   public async startBatchConsumer(): Promise<void> {
//     const topic: ConsumerSubscribeTopics = {
//       topics: ["example-topic"],
//       fromBeginning: false,
//     };
//
//     try {
//       await this.kafkaConsumer.connect();
//       await this.kafkaConsumer.subscribe(topic);
//       await this.kafkaConsumer.run({
//         eachBatch: async (eachBatchPayload: EachBatchPayload) => {
//           const { batch } = eachBatchPayload;
//           for (const message of batch.messages) {
//             const prefix = `${batch.topic}[${batch.partition} | ${message.offset}] / ${message.timestamp}`;
//             console.log(`- ${prefix} ${message.key}#${message.value}`);
//           }
//         },
//       });
//     } catch (error) {
//       console.log("Error: ", error);
//     }
//   }
//
//   public async shutdown(): Promise<void> {
//     await this.kafkaConsumer.disconnect();
//   }
//
//   private createKafkaConsumer(): Consumer {
//     const kafka = new Kafka({
//       clientId: "client-id",
//       brokers: ["example.kafka.broker:9092"],
//     });
//     const consumer = kafka.consumer({ groupId: "consumer-group" });
//     return consumer;
//   }
// }
