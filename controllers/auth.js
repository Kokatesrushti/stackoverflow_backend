import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import dotenv from 'dotenv'
import users from '../models/auth.js'
import pkg from 'twilio'


dotenv.config()

const {Twilio}= pkg

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = new Twilio(accountSid, authToken);




export const signup = async (req, res) =>{
    const {name, email, password} =req.body
    try{
        const existinguser = await users.findOne({email})
        if(existinguser){
            return res.status(404).json({message: "User already exist..."})
        }
        const hashedPassword = await bcrypt.hash(password, 12)
        const newUser = await users.create({name, email, password: hashedPassword})
        const token = jwt.sign({email : newUser.email, id : newUser._id}, process.env.JWT_SECRET, { expiresIn: '1h'})
        res.status(200).json({result: newUser, token})
    }
    catch(error){
        res.status(500).json("Something went wrong....")
    }

}

export const login = async (req, res) =>{
    const {email,password} =req.body

    
    // to send otp
    // client.verify.v2.services(process.env.TWILIO_SERVICE_ID)
    //             .verifications
    //             .create({to: '+91' + phonenumber, channel: 'sms'})
    //             .then((verification) => {
    //                 res.status(200).json({verification})
    //             })
    //             .catch(error => {
    //                 res.status(400).json({error})
    //             })


    try{
        const existinguser = await users.findOne({email})
        if(!existinguser){
            return res.status(404).json({message: "User don't exist..."})
        }

        const isPasswordCrt = await bcrypt.compare(password, existinguser.password)
        if(!isPasswordCrt){
            return res.status(400).json({message : "Invalid Credentials"})
        }
        

        const token = jwt.sign({email : existinguser.email, id : existinguser._id}, process.env.JWT_SECRET, { expiresIn: '1h'})
         res.status(200).json({result: existinguser, token})

    }
    catch(error){
        res.status(500).json("Something went wrong")
    }
   
}

export const sendotp = async(req,res) =>{
   const {phonenumber} = req.body
  try{

        await client.verify.v2.services(process.env.TWILIO_SERVICE_ID)
                .verifications
                .create({to: '+91' + phonenumber, channel: 'sms'})
                 res.status(200).json("Otp send successfully!")

    }
    catch(error){
        res.status(400).json("Something went wrong")
    } 
}

export const verifyotp = async(req,res) =>{
    const {phonenumber,otp} = req.body
    console.log(phonenumber)
    console.log(otp)
   try{
 
             const {valid} = await client.verify.v2.services(process.env.TWILIO_SERVICE_ID)
                 .verificationChecks
                 .create({
                    to: '+91' + phonenumber, channel: 'sms',
                    code: otp,
                })
                // console.log(verifiedResponse)
                res.status(200).json({valid})

     }
     catch(error){
        res.status(400).json({message: error.message})
     } 
 }


