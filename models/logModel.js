import bcrypt from "bcrypt";
import db from "./../config/db.js";
import utility from "./../services/utility.js";
import logServices from "./../services/logServices.js";

const create=async(payload)=>{
    try{
        const userId=utility.genId();
        const {email,password,name}=payload;

        const hashedPassword=logServices.hashedPassword(password);

         const result = await db.client.query(
            `INSERT INTO users (name, email, password, userId) VALUES ($1, $2, $3, $4) RETURNING id, name, email`,
            [name, email, hashedPassword, userId]
        );

        return result.rows[0];

    } catch(error){
        console.log("database Error in Creating a User - ",error);
        throw error;
    }
};


const login=async(payload)=>{
    try{

        const {email,password,phone}=payload;

        const hashedPassword=logServices.passHash(password);

        const result = await db.client.query(
            `SELECT * FROM users WHERE email = $1`,
            [email]
        );

        const user = result.rows[0];
            if (!user) {
                return {status:false,messge:"User Not Found"}
            };

        const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                return {status:false,message:"Incorrect Password"};
            };

        return {status:true, userId: user.userId, name: user.name, email: user.email };

    } catch(error){
        console.log("Database Error while logging in");
        throw error;
    }
}


export default {
    create,
    login
}