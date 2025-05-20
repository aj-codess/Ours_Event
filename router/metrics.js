import express from 'express';
import metricsController from './../controller/metricsController.js';

const metricsRouter = express.Router();

metricsRouter.get("/", (req, res) => {
    metricsController.getMetrics(req, res);
});

export default metricsRouter;