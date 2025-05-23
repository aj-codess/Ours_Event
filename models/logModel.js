import db from "./../config/db.js";
import utility from "./../services/utility.js";

const create=async(payload)=>{
    try{
        const userId=utility.genId();
        const {email,password,name,phone}=payload;

        

    } catch(error){
        console.log("database Error in Creating a User - ",error);
        throw error;
    }
};


export default {
    create
}