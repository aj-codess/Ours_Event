import WebSocket from "ws";
import connection from "./../models/connectionSchema.js";


const chatSocketModel = new WebSocket.Server({noServer:true});

chatSocketModel.on("connection",async(socket_addr,req)=>{

    const socket_details={
        userId:req.user,
        ip:socket_address.handshake.address,
        port:process.env.SERVER_PORT,
        connected_at: new Date()
    };

    await syncConnection(socket_details);

    socket_addr.on("message",async(message)=>{
        try{



        } catch(error){
            socket_addr.send(JSON.stringify({message:"internal Server Error in stream",error}));

            console.log("Stream Related Error in chat socket Model - ",error);
        }
    })

});


const syncConnection=async(socket_details)=>{
    try{

        

    } catch(error){
        console.log("Error Syncing Connection in Database");
        throw error;
    }
};

export default chatSocketModel;