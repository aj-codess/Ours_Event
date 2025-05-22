

const createEvent=async(req,res)=>{
    try{

    } catch(error){
        res.status(500).json({message:"Error Creating Event"});
        console.log("Error Creating Event - ",error);
    }
};


const getAllEvents=async(req,res)=>{
    try{

    } catch(error){
        res.status(500).json({message:"Internal Server Error Getting All Events"});
        console.log("Error getting all Events - ",error);
    }
};


const deleteEvent=async(req,res)=>{
    try{

    } catch(error){
        res.status(500).json({message:"Internal Server Error Deleting Events"});
        console.log("Error Deleting Events - ",error);
    }
};


const getEventSubmembers=async(req,res)=>{
    try{

    } catch(error){
        res.status(500).json({message:"Internal Server Error Getting Event Submembers"});
        console.log("Error Getting Event Submembers - ",error);
    }
};


const acceptInEvent=async(req,res)=>{
    try{

    } catch(error){
        res.status(500).json({message:"Internal Server Error adding User To Event"});
        console.log("Error Adding User To Event - ",error);
    }
};


const makeOpen=async(req,res)=>{
    try{

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


export default {
    joinEvent,
    uploadToEvent,
    makeOpen,
    acceptInEvent,
    getEventSubmembers,
    deleteEvent,
    getAllEvents,
    createEvent
}