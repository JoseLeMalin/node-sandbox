import { Request, Response, NextFunction, Router } from "express";
import { getCardHandler } from "../handlers/cards/cards.handlers";

export const cardsRouter = Router();
/* GET users listing. */
cardsRouter.get(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log("In the cards get endpoint");

      const card = await getCardHandler(req);
      res.status(200).send(card);
    } catch (error) {
      next(error);
    }
  },
);

// cardsRouter.post(
//   "/",
//   async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       const createdUser = await userCreate(req);
//
//       res.status(201);
//       res.send(createdUser);
//     } catch (error) {
//       next(error);
//     }
//   },
// );
