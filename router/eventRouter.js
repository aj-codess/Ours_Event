import express from 'express';
import eventController from './../controller/eventController.js';

const eventRouter = express.Router();

eventRouter.post("/create", (req, res) => {
    eventController.createEvent(req,res);
});


eventRouter.delete("/delete", (req, res) => {
    eventController.deleteEvent(req,res);
});


eventRouter.get("/getSubmembers", (req, res) => {
    eventController.getEventSubmembers(req,res);
});


eventRouter.post("/acceptInEvent", (req, res) => {
    eventController.acceptInEvent(req,res);
});


eventRouter.post("/makeOpen", (req, res) => {
    eventController.makeOpen(req,res);
});


eventRouter.post("/upload",(req,res)=>{
    eventController.uploadToEvent(req,res);
});


eventRouter.get("/", (req, res) => {
    eventController.getAllEvents(req, res);
});


eventRouter.post("/joinEvent",(req,res)=>{
    eventController.joinEvent(req,res);
})

export default eventRouter;