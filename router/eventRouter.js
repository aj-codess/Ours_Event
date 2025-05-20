import express from 'express';
import eventController from './../controller/eventController.js';

const eventRouter = express.Router();

eventRouter.post("/create", (req, res) => {
    eventController.createEvent(req, res);
});


eventRouter.delete("/delete", (req, res) => {
    eventController.deleteEvent(req, res);
});


eventRouter.get("/getSubmembers", (req, res) => {
    eventController.getSubmembers(req, res);
});


eventRouter.post("/acceptInEvent", (req, res) => {
    eventController.acceptInEvent(req, res);
});


eventRouter.post("/makeOpen", (req, res) => {
    eventController.makeOpen(req, res);
});

eventRouter.get("/", (req, res) => {
    eventController.getAllEvents(req, res);
});

export default eventRouter;