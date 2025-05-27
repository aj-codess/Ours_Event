import db from "./../config/db.js";
import utility from "./../services/utility.js";

//make a room to create category id

const create=async(payload)=>{
    try{

        const eventId=utility.genId();

        const {title,description,locationName,latitude,longitude,startTime,endTime,category_id}=payload;
        
        const result=await db.client.query(
            `INSERT INTO events (title, description, locationName, latitude, longitude, startTime, endTime, category_id)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
            [title, description, locationName, latitude, longitude, startTime, endTime, category_id]
        );

        if(!result){
            return {status:false,message:"Error Writing to Database"};
        }

        if(result.rowCount===1){
            return {status:true,data:result.rows[0]};
        };

    } catch(error){
        console.log("Error creating Event in DB");
        throw error;
    }
}


const createCategory=async()=>{
    try{

    } catch(error){
        console.log("Error creating category");
        throw error;
    }
}



const getEvent=async()=>{
    try{

        const obj=await db.client.query(
            `SELECT * FROM events`
        );

        if(!obj){
            return {status:false,message:"No Event Found"};
        };

        if(obj.rowCount===1){
            return {status:true,data:obj.rows[0]};
        };

    } catch(error){
        console.log("Error Getting Events in DB");
        throw error;
    }
};



const deleteEvents=async(eventId)=>{
    try{

        const obj=await db.client.query(
            `DELETE FROM events WHERE event_id = $1`,
            [eventId]
        );

        if(!obj){
            return {status:false,message:"Event not Found"};
        };

        if(obj.rowCount===1){
            return {status:true,data:obj.rows[0]};
        }

    } catch(error){
        console.log("Error Deleting Event");
        throw error;
    }
};



const eventSubmembers=async(eventId)=>{
    try{

        

    } catch(error){
        console.log("Error Getting Event Sub-members");
        throw error;
    }
};



const eventJoinRequest=async(eventId)=>{
    try{

    } catch(error){
        console.log("Error Getting Join Request");
        throw error;
    }
}



const acceptInEvent=async(eventId,userId)=>{
    try{

    } catch(error){
        console.log("Error Accepting User in Event");
        throw error;
    }
};


const makeOpen=async(eventId)=>{
    try{

        const obj=await db.client.query(
            `UPDATE events SET isOpen = TRUE WHERE eventId = $1`,
            [eventId]
        );

        if(!obj){
            return {status:false,message:"Error Opening Event"}
        };

        if(obj.rowCount===1){
            return {status:true,message:"Event Opened"};
        };

    } catch(error){
        console.log("Error making Event Open");
        throw error;
    }
};


const upload=async(payload)=>{
    try{

    } catch(error){
        console.log("Error uploading to Event");
        throw error;
    }
};



const joinEvent=async(userId,eventId)=>{
    try{

    } catch(error){
        console.log("Error Joining Event");
        throw error;
    }
}



export default {
    create,
    createCategory,
    getEvent,
    deleteEvents,
    eventSubmembers,
    acceptInEvent,
    makeOpen,
    upload,
    joinEvent
}