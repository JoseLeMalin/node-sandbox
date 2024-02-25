import { Router } from "express";
import { Request, Response, NextFunction } from "express";


export const indexRouter = Router();

/* GET home page. */
indexRouter.get("/", (req: Request, res: Response, next: NextFunction) => {
  try {
    res.render("index", { title: "Express" });
  } catch (error) {
    next(error);
  }
});
