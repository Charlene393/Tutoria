 import dotenv from 'dotenv';
import express from 'express';
import jwt from 'jsonwebtoken';
import prisma from './utils/prisma.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 6000;

//Middleware to parse JSON request bodies
app.use(express.json({ limit: "100mb" }));


//User Login 
app.post('/login', async (req, res) => {
    try{
        const{signedToken} = req.body;
        const data = jwt.verify(signedToken, process.env.JWT_SECRET);
        if (data) {
            const isUserExist = await prisma.user.findUnique ({
                where:{
                    email:data.email,
                },
            });
            if(!isUserExist){
               // await sendToken (isUserExist, res)
            }else{
                const User = await prisma.user.create({
                    data:{
                        email: data.email,
                        name: data.name,
                        avatar: data.avatar,
                    }
                })
                // await sendToken (User, res)
            }
        }else{
            res.status(404).json({success :false, message: 'Your request is invalid'})
        }
    }catch(error){
        console.log(error);
        res.status(500).json({success: false, message: 'Internal server error'})
    }
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});