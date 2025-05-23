import userModel from "./../models/userModel.js";

const getUserProfile=async(req,res)=>{
    try{

        const obj=await userModel.getUserProfile(req.user);

        if(!obj){
            return res.status(404).json({status:false,message:"User Not Found"});
        }

        return res.status(200).json({status:true,data:obj});

    } catch(error){
        res.status(500).json({message:"internal Server Error in getting User Profile"});
        console.log("Error Getting User Profile - ",error);
    }
};


const updateUser=async(req,res)=>{
    try{

        const obj=await userModel.updateUser(req.user,res.body);

        if(!obj){
            return res.json({status:false,message:"User Data not saved"});
        };

        return res.status(200).json({status:true,data:obj});

    } catch(error){
        res.status(500).json({message:"Internal Server Error in Updating User"});
        console.log("Error Updating User - ",error);
    }
};


const deleteAccount=async(req,res)=>{
    try{
        const {password}=req.body;
        const obj=await userModel.deleteAccount(req.user,password);

        return obj;

    } catch(error){
        res.status(500).json({message:"Internal Server Error in Deleting Account"});
        console.log("Error Deleting Account - ",error);
    }
};


const addUser=async(req,res)=>{
    try{
        const {userToAdd}=req.body;
        const obj=await userModel.addUser(req.user,userToAdd);

        return obj;
    } catch(error){
        res.status(500).json({message:"Internal Server Error Adding User"});
        console.log("Error Adding up User - ",error);
    }
};


const removeUser=async(req,res)=>{
    try{

        const {userToRemove}=req.body;
        const obj=await userModel.removeUser(req.user,userToRemove);

        return obj;

    } catch(error){
        res.status(500).json({messge:"Internal Server Error in Removing User"});
        console.log("Error removing User - ",error);
    }
};


//gets both friends and friends in the request pool
const getAmigo=async(req,res)=>{
    try{
        const obj=await userModel.getFriendsNRequests(req.user);
        return obj;
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