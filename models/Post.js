import mongoose from "mongoose";

const PostSchema =new mongoose.Schema({
    postDesc: {type:String},
    Image : {type:String,
        required: true},
    Like: {type:Array, default: []},
    userPosted : {type : String, required:"post must have an author"},
    userId : {type : String},
    // postedOn : {type : Date, default: Date.now},

},{timestamps: true})
export default mongoose.model("Post",PostSchema)