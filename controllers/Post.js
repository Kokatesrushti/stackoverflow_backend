import Post from "../models/Post.js";
import mongoose from "mongoose";
import cloudinary from 'cloudinary'
export const sharePost = async(req,res) => {
    try {
    const {
        desc,
        imageData,
        userPosted,
        } = req.body
    const userId = req.userId;
    // console.log(req.body)
    if(desc|imageData|userPosted){
        return res.status(400).json({
            message:"Err"
        })
    }
    //uploading image to cloudinary
    const cloud=await cloudinary.v2.uploader.upload(imageData,{
        folder:"posts",
        quality:"30"
    })
    const post = await Post.create({
        postDesc:desc,
        Image:cloud.url,
        userPosted ,
        userId 
    })
  
        await post.save()
        res.status(200).json({
            message:"shared post successfully",
            post
        })
    } catch (error) {
        // console.log(error)
        res.status(409).json({
            message:error.message
        })
    }
}

export const getAllPosts = async (req, res) => {
    try {
        const postsList = await Post.find();
        // console.log(postsList)
        res.status(200).json({postsList});
        
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
} 


export const deletePost = async (req, res) => {
    const { id:_id } = req.params ;

    if(!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(404).send('post unavailable...');
    }

    try {
        await Post.findByIdAndRemove( _id );
        res.status(200).json({ message: "successfully deleted..."})
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export const likePost = async(req,res)=>{
    const { id: _id } = req.params;
    const {userId} = req.body;
    try{
        const post= await Post.findById(_id)
        if(!post.Like.includes(userId)){
            await post.updateOne({$push: {Like: userId}})
            res.status(200).json({message : "The post has been liked"})
        }
        else{
            await post.updateOne({$pull: {Like: userId}})
            res.status(200).json({message: "The post has been Disliked"})

        }
    }
    catch(error)
    {
        res.status(500).json({message: error.message})
    }
}