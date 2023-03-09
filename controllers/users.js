import mongoose from 'mongoose'
import users from '../models/auth.js'


export const getAllUsers = async (req, res) => {
    try {
        const allUsers = await users.find();
        const allUserDetails = []
        allUsers.forEach(user => {
            allUserDetails.push({ _id: user._id, name: user.name, about: user.about, tags: user.tags, joinedOn: user.joinedOn })
        })
        res.status(200).json(allUserDetails);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}


export const updateProfile = async (req, res) => {
    const { id: _id } = req.params;
    const { name, about, tags } = req.body;

    if(!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(404).send('question unavailable...');
    }

    try {
        const updatedProfile = await users.findByIdAndUpdate( _id, { $set: { 'name': name, 'about': about, 'tags': tags }}, { new: true } )
        res.status(200).json(updatedProfile)
    } catch (error) {
        res.status(405).json({ message: error.message })
    }
}


export const addFriend = async (req, res) => {
    if (req.body.userId !== req.params.id){
        try {
          const param_id = await users.find({_id:req.params.id});
        //   console.log(param_id);
          const user = await users.find({ _id: req.body.userId });
        //   console.log(user);
          if (!user) {
            return res.status(400).json({ error: 'user not found' });
          }
          const updatedUser = await users.updateOne(
            { _id: req.body.userId },
            { $push: { addfriend: [...param_id] } }
            // user.addFriend.push(param_id);
          );
        //   console.log(user);
          return res.status(200).json({ updatedUser });
        } catch (error) {
          console.error(error);
          return res.status(400).json({ error });
        }
    }
      };



      // export const removeFriend = async (req, res) => {
      //   if (req.userId !== req.params.id){
      //     console.log(req.userId)
      //       try {
      //         const param_id = await users.find({_id:req.params.id});
      //         const user = await users.find({ _id: req.userId });
      //         if (!user) {
      //           return res.status(400).json({ error: 'user not found' });
      //         }
      //         const updatedUser = await users.findByIdAndUpdate(
      //           { _id: req.userId },
      //           { $pull: { addfriend: [...param_id] } },
      //           {new:true}
      //           // user.addFriend.push(param_id);
      //         );
      //       //   console.log(user);
      //         return res.status(200).json({ updatedUser });
      //       } catch (error) {
      //         console.error(error);
      //         return res.status(400).json({ error });
      //       }
      //   }
      //     };

      export const removeFriend=async(req,res)=>{
        try {
          const toRemove=await users.findById({_id:req.params.id})
          const user=await users.findById(req.userId)
          if(!toRemove){
            return res.status(400).json({
              message:"User Doesn't exist"
            })
          }
          if(!user){
            return res.status(400).json({
              message:"User Doesn't exist"
            })
          }
          console.log(toRemove._id)
          if(!user.addfriend.includes(toRemove._id)){
            return res.status(400).json({
              message:"Need to follow first"
            })
          }else{
            const indexRM=user.addfriend.indexOf(req.params.id)
            user.addfriend.splice(indexRM,1)

            // const toRemoveIndex=user.addfriend.indexOf(req.userId)
            // toRemove.addfriend.splice(toRemoveIndex,1)

            await user.save()
            // await toRemove.save()

            return res.status(200).json({
              message:"Friend Removed"
            })
          }
        } catch (error) {
          res.status(400).json({
            message:error.message
          })
        }
      }


    
      




