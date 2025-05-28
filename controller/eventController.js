import eventModel from "../models/eventModel.js";

const createEvent=async(req,res)=>{
    try{

        const obj=await eventModel.create(req.user,req.body);

        if(!obj){
            return res.status(500).json({status:false,message:"Internal Database Error"});
        }

        if(obj.status==false){
            return res.status(400).json(obj);
        }

        return res.status.status(201).json(obj);

    } catch(error){
        res.status(500).json({message:"Error Creating Event"});
        console.log("Error Creating Event - ",error);
    }
};


const getAllEvents=async(req,res)=>{
    try{

        const obj=await eventModel.getEvent();

        if(!obj){
            return res.status(404).json({status:false,message:"Server Error Getting Event"});
        }

        if(!obj.status){
            return res.status(404).json(obj)
        };

        return res.status(200).json(obj);

    } catch(error){
        res.status(500).json({message:"Internal Server Error Getting All Events"});
        console.log("Error getting all Events - ",error);
    }
};


const deleteEvent=async(req,res)=>{
    try{

        const {eventId}=req.query;

        const obj=await eventModel.deleteEvent(req.user,eventId);

        if(!obj){
            return res.status(500).json({status:false,message:"Internal Server Error Deleting Event"});
        };

        if(obj.status==false){
            return res.status(400).json(obj);
        }

        return res.status(200).json(obj);

    } catch(error){
        res.status(500).json({message:"Internal Server Error Deleting Events"});
        console.log("Error Deleting Events - ",error);
    }
};


const getEventSubmembers=async(req,res)=>{
    try{
        const {eventId}=req.query;

        const obj=await eventModel.eventSubmembers(eventId);

        if(!obj){
            return res.status(500).json({status:false,message:"Internal Server Error getting Submembers"});
        };

        if(obj.status==false){
            return res.status(404).json(obj);
        }

        return res.status(200).json(obj);

    } catch(error){
        res.status(500).json({message:"Internal Server Error Getting Event Submembers"});
        console.log("Error Getting Event Submembers - ",error);
    }
};


const acceptInEvent=async(req,res)=>{
    try{

        const {eventId,userId}=req.query;

        const obj=await eventModel.acceptInEvent(eventId,userId);

        if(!obj){
            return res.status(500).json({status:false,message:"Internal Server Error Accepting User In Event"})
        };

        if(obj.status==false){
            return res.status(404).json(obj);
        };

        return res.status(200).json(obj);

    } catch(error){
        res.status(500).json({message:"Internal Server Error adding User To Event"});
        console.log("Error Adding User To Event - ",error);
    }
};


const makeOpen=async(req,res)=>{
    try{
        const eventId=req.query;

        const obj=await eventModel.makeOpen(req.user,eventId);

        if(!obj){
            return res.status(500).json({status:false,message:"Failed Opening Event"});
        }

        

    } catch(error){
        res.status(500).json({message:"Internal Server Error Opening Event"});
        console.log("Error Opening Event to public - ",error);
    }
};


const uploadToEvent=async(req,res)=>{
    try{

    } catch(error){
        res.status(500).json({message:"Internal Server Error making Upload To Event"});
        console.log("Error uploading to Event - ",error);
    }
};


const joinEvent=async(req,res)=>{
    try{

    } catch(error){
        res.status(500).json({message:"Internal Server Error Joining Event"});
        console.log("Error Joining Event - ",error);
    }
};


const getCategories=async(req,res)=>{
    try{

    } catch(error){
        
    }
}


const createCategory=async(req,res)=>{
    try{

    } catch(error){

    }
}


const getEventJoinRequest=async(req,res)=>{
    try{

    } catch(error){

    }
}


export default {
    joinEvent,
    uploadToEvent,
    makeOpen,
    acceptInEvent,
    getEventSubmembers,
    deleteEvent,
    getAllEvents,
    createEvent,
    getCategories,
    createCategory,
    getEventJoinRequest
}