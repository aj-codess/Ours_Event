import express from "express";
import logController from "./../controller/logController.js";

const logRouter = express.Router();

logRouter.post("/new", (req, res) => {
    logController.createUser(req, res);
}); 

logRouter.post("/old", (req, res) => {
    logController.loginUser(req, res);
});

logRouter.get("/logout", (req, res) => {
    logController.logoutUser(req, res);
});

export default logRouter;