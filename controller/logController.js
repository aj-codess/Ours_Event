
const createUser=async(req,res)=>{
    try{

    } catch(error){
        res.status(500).json({message:"Internal Server Error Creating User"});
        console.log("Error creating User - ",error);
    }
}


const loginUser=async(req,res)=>{
    try{

    } catch(error){
        res.status(500).json({message:"Internal Server Error in Loggin"});
        console.log("Error in Login - ",error);
    }
}



const logoutUser=async(req,res)=>{
    try{

    } catch(error){
        res.status(500).json({message:"Internal Server Error logging out user"});
        console.log("Error in Logout - ",error);
    }
}


export default {
    createUser,
    loginUser,
    logoutUser
}