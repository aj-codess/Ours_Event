import db from "./../config/db.js";

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

    return result.rows[0];
  } catch (error) {
    console.log("Error Updating user - ", error);
    throw error;
  }
};



const deleteAccount=async(userId,password)=>{
    try{

        const result=await db.client.query(
            `DELETE FROM users WHERE `
        );

    } catch(error){
        console.log("Error Deleting user - ", error);
        throw error;
    }
}


export default {
    getUserProfile,
    updateUser
}