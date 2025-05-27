import db from "./../config/db.js";
import utility from "./../services/utility.js";

const create=async(payload)=>{
    try{

        const eventId=utility.genId();

        const {title,description,locationName,latitude,longitude,startTime,endTime,category_id}=payload;
        
        const result=await db.client.query(
            `INSERT INTO events (title, description, locationName, latitude, longitude, startTime, endTime, category_id, eventId)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`,
            [title, description, locationName, latitude, longitude, startTime, endTime, category_id, eventId]
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


const createCategory=async(payload)=>{
    try{

        const category_id=utility.genId();

        const {categoryName}=payload;

        const result=await db.client.query(
            `INSERT INTO categories (category_id,name) 
            VALUES ($1,$2)`,
            [category_id,categoryName]
        );

        if(!result){
            return {status:false,message:"Category Wasnt Created"};
        };

        if(result.rowCount===1){
            return {status:true,message:"Category Created Successfully"};
        };

    } catch(error){
        console.log("Error creating category");
        throw error;
    }
}


const getCategories=async()=>{
    try{

        const obj=await db.client.query(
            `SELECT * FROM categories`
        );

        if(!obj){
            return {status:false,message:"Failed Getting Categories"};
        }

        if(obj.rowCount===1){
            return {status:true,data:obj.rows[0]};
        };

    } catch(error){
        console.log("Error Getting Categories");
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
            `DELETE FROM events WHERE eventId = $1`,
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

        const result = await db.client.query(
            `SELECT submembers FROM events WHERE eventId = $1`,
            [eventId]
        );

        if(!result){
            return {status:false,message:"Error Getting Sub members"}
        };

        if(result.rowCount===1){
            return {status:true,data:result.rows[0]};
        }

    } catch(error){
        console.log("Error Getting Event Sub-members");
        throw error;
    }
};



const eventJoinRequest=async(eventId)=>{
    try{

        const result = await db.client.query(
            `SELECT joinRequest FROM events WHERE eventId = $1`,
            [eventId]
        );

        if(!result){
            return {status:false,message:"Couldnt get join requests "}
        };

        if(result.rowCount===1){
            return {status:true,data:result.rows[0]}
        };

    } catch(error){
        console.log("Error Getting Join Request");
        throw error;
    }
}



const acceptInEvent = async (eventId, userId) => {
  try {
    await db.client.query('BEGIN');

    await db.client.query(
      `UPDATE events 
       SET joinRequest = array_remove(joinRequest, $1) 
       WHERE eventId = $2`,
      [userId, eventId]
    );


    await db.client.query(
      `UPDATE events 
       SET submembers = array_append(submembers, $1) 
       WHERE eventId = $2`,
      [userId, eventId]
    );

    await db.client.query('COMMIT');

    return {status:true,message:"user accepted"};
  } catch (error) {
    await db.client.query('ROLLBACK');
    console.log("Error Accepting User in Event", error);
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



const joinEvent = async (userId, eventId) => {
  try {
    await db.client.query('BEGIN');

    const eventResult = await db.client.query(
      `SELECT isOpen FROM events WHERE eventId = $1`,
      [eventId]
    );

    if (eventResult.rowCount === 0) {
      return {status:false,message:"Event Not Found"};
    }

    const isOpen = eventResult.rows[0].isopen;

    if (isOpen) {
      await db.client.query(
        `UPDATE events 
         SET submembers = array_append(submembers, $1) 
         WHERE eventId = $2`,
        [userId, eventId]
      );
    } else {
      await db.client.query(
        `UPDATE events 
         SET joinRequest = array_append(joinRequest, $1) 
         WHERE eventId = $2`,
        [userId, eventId]
      );
    }

    await db.client.query('COMMIT');

    return { success: true, message: isOpen ? "Joined directly" : "Request to join sent" };

  } catch (error) {
    await db.client.query('ROLLBACK');
    console.log("Error Joining Event:", error);
    throw error;
  }
};



export default {
    create,
    createCategory,
    getEvent,
    deleteEvents,
    eventSubmembers,
    acceptInEvent,
    makeOpen,
    upload,
    joinEvent,
    eventJoinRequest,
    getCategories
}