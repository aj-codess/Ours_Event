import dotenv from "dotenv";
import express from 'express';
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";

import authRouter from "./middleware/userAuth.js";
import logRouter from "./router/logRouter.js";
import userRouter from "./router/userRouter.js";
import eventRouter from "./router/eventRouter.js";
import db from "./config/db.js";
import connectDB from "./config/db2.js";
import metricsRouter from "./router/metrics.js";
import logServices from "./services/logServices.js";

import chatSocketModel from "./socketHandlers/chatSocketModel.js";
import eventSocketModel from "./socketHandlers/eventSocketModel.js";
import searchSocketModel from "./socketHandlers/searchSocketModel.js";
import userSearchSocketModel from "./socketHandlers/userSearchSocketModel.js";

const app = express();
logServices.writePrivatePublic();
logServices.loadPersistentKeys();
dotenv.config();
db.connect();
connectDB();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

app.use("/login",logRouter);
app.use("/",authRouter);
app.use("/user",userRouter);
app.use("/event",eventRouter);
app.use("/metrics",metricsRouter);
app.use((req, res, next) => {
    res.status(404).json({ message: "Route not found" });
});

const server=app.listen(PORT, () => {

    console.log(`Server is running on http://localhost:${PORT}`);

});


server.on("upgrade",async(req,socket,head)=>{

        const res = {
            status: (code) => ({
            json: (message) => {
                socket.write(`HTTP/1.1 ${code} ${message.message}\r\n\r\n`);
                socket.destroy();
                },
            }),
        }; 


        const runMiddleware=(req,res)=>{
            return new Promise((resolve, reject) => {
                auth_router.handle(req, res, (err) => {
                if (err) return reject(err);
                    resolve();
                });
            });
        };

    try{

        await runMiddleware(req,res);

         if (!req.user) {
            socket.write(`HTTP/1.1 403 Forbidden\r\n\r\n`);
            socket.destroy();
            return;
        };

        if(url.includes("/eventFeeds")){

            eventSocketModel.handleUpgrade(req,socket,head,(socket_addr)=>{
                eventSocketModel.emit("connection",socket_addr,req);
            });

        } else if(url.includes("/eventSearch")){

            searchSocketModel.handleUpgrade(req,socket,head,(socket_addr)=>{
                searchSocketModel.emit("connection",socket_addr,req);
            })

        } else if(url.includes("/userChat")){

            chatSocketModel.handleUpgrade(req,socket,head,(socket_addr)=>{
                chatSocketModel.emit("connection",socket_addr,req);
            });

        } else if(url.includes("/userSearch")){

            userSearchSocketModel.handleUpgrade(req,socket,head,(socket_addr)=>{
                userSearchSocketModel.emit("connection",socket_addr,req);
            });

        };

    } catch(error){
        socket.write(`HTTP/1.1 403 Forbidden\r\n\r\n`);
        
        socket.destroy();

        console.log("Error With Websocket - ",error);
    }
})