import express from 'express';
import eventController from './../controller/eventController.js';

const eventRouter = express.Router();

eventRouter.post("/create", (req, res) => {

});


eventRouter.delete("/delete", (req, res) => {

});


eventRouter.get("/getSubmembers", (req, res) => {

});


eventRouter.post("/acceptInEvent", (req, res) => {

});


eventRouter.post("/makeOpen", (req, res) => {

});


eventRouter.post("/upload",(req,res)=>{

});


eventRouter.get("/", (req, res) => {
    eventController.getAllEvents(req, res);
});

export default eventRouter;