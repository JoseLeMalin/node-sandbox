import { Request } from "express";
import { v4 } from "uuid";
import { z } from "zod";
import { ProducerFactoryBis } from "../../lib/kafka/producer.kafka";
import { ApiError, messageCode } from "../../utils/express/errors";
import { getCardByIdService } from "./cards.service";

if (
  !process.env.KAFKA_PRODUCER_CLIENTID ||
  !process.env.KAFKA_BROKER ||
  !process.env.KAFKA_GROUPID
)
  throw new ApiError(
    500,
    messageCode.MISSING_ENV_VARIABLE,
    "Missing Kafka Producer ClientId",
  );
const { sendMessages, shutdown, start } = ProducerFactoryBis(
  process.env.KAFKA_PRODUCER_CLIENTID,
  [process.env.KAFKA_BROKER],
);

export const getCardHandler = async (req: Request) => {
  await start();
  await sendMessages([
    { key: v4(), value: "This is the getUserHandler Message" },
  ]);

  await shutdown();
  const cardIdSchema = z.object({
    id: z.string().uuid(),
  });
  const parsedBody = await cardIdSchema.safeParseAsync(req.params);
  if (!parsedBody.success)
    throw new ApiError(
      404,
      messageCode.WRONG_QUERY_PARAMS,
      "Data provided from client do not respect expected inputs",
    );
  //  await customShutdown();

  return await getCardByIdService(parsedBody.data.id);
};
