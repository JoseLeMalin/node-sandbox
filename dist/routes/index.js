import { Router } from "express";
export const indexRouter = Router();
/* GET home page. */
indexRouter.get("/", (req, res, next) => {
    try {
        res.render("index", { title: "Express" });
    }
    catch (error) {
        next(error);
    }
});
