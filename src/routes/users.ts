import { Request, Response, NextFunction, Router } from "express";
import { getUserHandler, userCreate } from "../handlers/users/users.handlers";

export const usersRouter = Router();
// const kafka = new Kafka({
//   clientId: "my-app",
//   brokers: ["localhost:9092", "localhost:8082"],
// });
// 
// export const kafkaUserProducer = kafka.producer();
// export const kafkaUserConsumer = kafka.consumer({ groupId: "test-group" });

/* GET users listing. */
usersRouter.get(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log("In the users get endpoint");

      const user = await getUserHandler(req);
      res.status(201).send(user);
    } catch (error) {
      next(error);
    }
  },
);

// usersRouter.post(
//   "/anothertest",
//   async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       const result = await userLoginHandler(req, res);
//
//       res.status(201);
//       res.send(result );
//     } catch (error) {
//       next(error);
//     }
//   },
// );

usersRouter.post(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const createdUser = await userCreate(req);

      res.status(201);
      res.send(createdUser);
    } catch (error) {
      next(error);
    }
  },
);
