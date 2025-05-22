import db from "./../config/db.js";

const getUser=async(id)=>{
    try{

        const result = await db.client.query(
            `SELECT userId,name,email,created_at FROM users WHERE userId = $1`,
            [id]
        );

        return result.rows[0];

    } catch(error){
        console.log("Error Getting User From DB - ",error);
    }
}


export default {
    getUser
}