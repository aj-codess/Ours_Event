import express from "express";
import userController from "../controller/userController.js";

const userRouter = express.Router();

userRouter.get("/", (req, res) => {
    userController.getUserProfile(req, res);
});


userRouter.put("/", (req, res) => {     
    userController.updateUser(req, res);
});

userRouter.delete("/delete", (req, res) => {
    userController.deleteAccount(req, res);
});


userRouter.post("/addUser",(req,res)=>{
    userController.addUser(req,res);
});


userRouter.delete("/removeUser",(req,res)=>{
    userController.removeUser(req,res);
});


userRouter.get("/getAmigos",(req,res)=>{
    userController.getAmigo(req,res);
});

export default  userRouter;