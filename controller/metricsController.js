
const getMetrics=async(req,res)=>{
    try{

    }catch(error){
        res.status(500).json({message:"Error Getting Metrics of Server Health"});
        console.log("Error Getting Metrics for Server - ",error);
    }
}


export default {
    getMetrics
}