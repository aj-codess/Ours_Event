
const getUserProfile=async(req,res)=>{
    try{

    } catch(error){
        res.status(500).json({message:"internal Server Error in getting User Profile"});
        console.log("Error Getting User Profile - ",error);
    }
};


const updateUser=async(req,res)=>{
    try{

    } catch(error){
        res.status(500).json({message:"Internal Server Error in Updating User"});
        console.log("Error Updating User - ",error);
    }
};


const deleteAccount=async(req,res)=>{
    try{

    } catch(error){
        res.status(500).json({message:"Internal Server Error in Deleting Account"});
        console.log("Error Deleting Account - ",error);
    }
};


const addUser=async(req,res)=>{
    try{

    } catch(error){
        res.status(500).json({message:"Internal Server Error Adding User"});
        console.log("Error Adding up User - ",error);
    }
};


const removeUser=async(req,res)=>{
    try{

    } catch(error){
        res.status(500).json({messge:"Internal Server Error in Removing User"});
        console.log("Error removing User - ",error);
    }
};


const getAmigo=async(req,res)=>{
    try{

    } catch(error){
        res.status(500).json({message:"Internal Server Error In Getting Amigo"});
        console.log("Error getting Amigo - ",error);
    }
};


export default {
    getUserProfile,
    updateUser,
    deleteAccount,
    addUser,
    removeUser,
    getAmigo
}