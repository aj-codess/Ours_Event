import logModel from "./../models/logModel.js";
import logServices from "../services/logServices.js";

const cookieOptions = {
  expires: new Date(Date.now() + 15 * 60 * 1000),
  httpOnly: true,
  sameSite: "strict",
};


const refreshCookieOptions = {
  expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  httpOnly: true,
  sameSite: "strict",
  secure: true,
};

const createUser=async(req,res)=>{
    try{

        const obj=await logModel.create(req.body);

        if(!obj){
            return res.status(500).json({status:false,message:"User Not Saved"});
        }

        const token=await logServices.signToken(obj.userId);
        const refreshToken=await logServices.signToken(obj.userId);

        res.cookie("authToken",token,cookieOptions);
        res.cookie("refreshToken",refreshToken,refreshCookieOptions);

        return res.status(200).json({status:true,data:obj,message:"User Created Successfully"});

    } catch(error){
        res.status(500).json({message:"Internal Server Error Creating User"});
        console.log("Error creating User - ",error);
    }
}


const loginUser=async(req,res)=>{
    try{

        const obj=await logModel.login(req.body);

        if(!obj){
            return res.status(500).json({status:false,message:"Internal Server Error"});
        }

        if(!obj.status){
            return res.status(203).json(obj);
        };

        const token=await logServices.signToken(obj.userId);
        const refreshToken=await logServices.signToken(obj.userId);

        res.cookie("authToken",token,cookieOptions);
        res.cookie("refreshToken",refreshToken,refreshCookieOptions);

        return res.status(200).json(obj);

    } catch(error){
        res.status(500).json({message:"Internal Server Error in Loggin"});
        console.log("Error in Login - ",error);
    }
}



const logoutUser=async(req,res)=>{
    try{

        res.clearCookie("authToken",{
            httpOnly: true,
            sameSite: 'Strict',
            secure: true,
        });

        return res.status(200).json({status:true,message:"Logged out successfully"})

    } catch(error){
        res.status(500).json({message:"Internal Server Error logging out user"});
        console.log("Error in Logout - ",error);
    }
};


export default {
    createUser,
    loginUser,
    logoutUser
}