import {Client} from "pg";

const client = new Client({
    user: process.env.USER,
    password: process.env.PASSWORD,
    host: process.env.HOST,
    port: process.env.PORT,
    database: process.env.DATABASE,
});


const connect=async()=>{
    try{

        await client.connect();

        console.log('Connected to database');
        
        client.on('error',(error)=>{
            console.log("Error Occured In the db - ",error);
            process.exit(1);
        });

        client.on('end', () => {
            console.log('Database connection ended');
        });

        client.on('notice', (notice) => {
            console.log('Database notice:', notice);
        });

    } catch(error){
        console.log("Error Connecting to db - ",error);
        process.exit(1);
    }
}


const disconnect=async()=>{
    try{

    } catch(error){
        console.log("Error Disconnecting Db - ",error);
    }
};

export default {
    connect,
    disconnect
}