import WebSocket from "ws";

const eventSocketModel = new WebSocket.Server({noServer:true});



export default eventSocketModel;