import db from "./../config/db.js";
import bcrypt from "bcrypt";

const getUserProfile=async(userId)=>{
    try{

        const result = await db.client.query(
            `SELECT userId,name,email,created_at FROM users WHERE userId = $1`,
            [userId]
        );

        return result.rows[0];

    } catch(error){
        console.log("Error Getting User From DB - ",error);
    }
};


const updateUser = async (userId, payload) => {
  try {
    const { name, email, password } = payload;

    const result = await db.client.query(
      `UPDATE users
       SET name = $1,
           email = $2,
           password = $3
       WHERE userId = $4
       RETURNING userId, name, email, created_at;`,
      [name, email, password, userId]
    );

    if(result.rowCount===1){
        return result.rows[0];
    }

  } catch (error) {
    console.log("Error Updating user - ", error);
    throw error;
  }
};



const deleteAccount=async(userId,password)=>{
    try{

        const result=await db.client.query(
            `SELECT password FROM users WHERE user_id = $1`,
            [userId]
        );

        if(result.rowCount===0){
            throw new Error("User not Found");
        }

        const hashedPassword=result.rows[0].password;

        const isMatch = await bcrypt.compare(password, hashedPassword);
            if (!isMatch) {
            throw new Error("Incorrect password");
        }

        const deleteResult = await db.client.query(
            `DELETE FROM users WHERE user_id = $1`,
            [userId]
        );

        if(deleteResult.rowCount===1){
            return {status: true, message: "Account deleted successfully" };
        } else{
            return {status:false,message:"Retry Later"};
        };

    } catch(error){
        console.log("Error Deleting user - ", error);
        throw error;
    }
};



const addUser=async(userId,userToAdd)=>{
    try{

        const results=await db.client.query(
            `UPDATE users SET friends = array_append(friends, $1) WHERE userId = $2`,
            [userToAdd,userId]
        );

        if(result.rowCount===1){
            return { success: true, message: "Friends Added successfully" };
        } else{
            return {status:false,message:"User not Added"};
        };

    } catch(error){
        console.log("Error adding user to friends - ", error);
        throw error;
    }
}


const removeUser=async(userId,userToRemove)=>{
    try{

        const result=await db.client.query(
            `UPDATE users SET friends = array_remove(friends, $1) WHERE userId = $2`,
            [userToRemove,userId]
        );

        if(result.rowCount===1){
            return {status:true,message:"User Removed"};
        } else{
            return {status:false,message:"User Not Removed"};
        }

    } catch(error){
        console.log("Error Removing User - ",error);
        throw error;
    }
};


const getFriendsNRequests=async(userId)=>{
    try{

        const result = await db.client.query(
            `SELECT friends, requests FROM users WHERE userId = $1`,
            [userId]
        );

        if (result.rowCount === 0) {
            throw new Error("User not found");
        }

        return result.rows[0];

    } catch(error){
        console.log("Error Getting Friends and Requests");
        throw error;
    }
}


export default {
    getUserProfile,
    updateUser,
    deleteAccount,
    addUser,
    removeUser,
    getFriendsNRequests
}