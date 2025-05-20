import dotenv from "dotenv";
import express from 'express';
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";

import authRouter from "./middleware/userAuth.js";
import logRouter from "./router/logRouter.js";
import userRouter from "./router/userRouter.js";
import eventRouter from "./router/eventRouter.js";
import dbConnector from "./config/db_connector.js";
import eventFeedRouter from "./router/eventFeedRouter.js";
import metricsRouter from "./router/metrics.js";
import logServices from "./services/logServices.js";

const app = express();
logServices.writePrivatePublic();
logServices.loadPersistentKeys();
dotenv.config();
dbConnector.connectDB();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

app.use("/",authRouter);
app.use("/login",logRouter);
app.use("/user",userRouter);
app.use("/event",eventRouter);
app.use("/eventFeed",eventFeedRouter);
app.use("/metrics",metricsRouter);
app.use((req, res, next) => {
    res.status(404).json({ message: "Route not found" });
});

const server=app.listen(PORT, () => {

    console.log(`Server is running on http://localhost:${PORT}`);

});