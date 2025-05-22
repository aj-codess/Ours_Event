import WebSocket from "ws";
import connection from "./../models/connectionSchema.js";

const chatSocketModel = new WebSocket.Server({noServer:true});

chatSocketModel.on("connection",async(socket_addr,req)=>{


    socket_addr.on("message",async(message)=>{
        try{



        } catch(error){
            socket_addr.send(JSON.stringify({message:"internal Server Error in stream",error}));

            console.log("Stream Related Error in chat socket Model - ",error);
        }
    })

})

export default chatSocketModel;