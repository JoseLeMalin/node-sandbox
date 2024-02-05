import express from "express";
export const usersRouter = express.Router();
/* GET users listing. */
usersRouter.get("/", (req, res, next) => {
    try {
        res.send("respond with a resource");
    }
    catch (error) {
        next(error);
    }
});
