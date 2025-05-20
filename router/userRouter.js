import express from "express";
import userController from "../controller/userController.js";

const userRouter = express.Router();

userRouter.get("/", (req, res) => {
    userController.getUser(req, res);
});


userRouter.put("/", (req, res) => {     
    userController.updateUser(req, res);
});

userRouter.delete("/delete", (req, res) => {
    userController.deleteAccount(req, res);
});


export default  userRouter;