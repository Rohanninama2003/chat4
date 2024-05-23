const mongoose=require("mongoose")
const moment = require("moment-timezone");

const messageModel=mongoose.Schema({
    sender:{ 
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    },
    content:{
        type:String,
        trim:true,
    },
    chat:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    }

},
{
    timestamps:true,
})

messageModel.virtual('created_at_ist').get(function () {
    return moment(this.createdAt).tz('Asia/Kolkata').format('YYYY-MM-DD HH:mm:ss');
});


const Message=mongoose.model("Message",messageModel)
module.exports={Message}