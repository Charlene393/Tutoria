import bcrypt from 'bcrypt';
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
                        password: data.password,
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

// User Signup
app.post('/signup', async (req, res) => {
    const { email, password, confirmPassword, role } = req.body;
    console.log('Incoming Request:', req.body); // Debugging log
    if (!email || !password || !confirmPassword || !role) {
        return res.status(400).json({ success: false, message: 'All fields are required.' });
    }
    if (password !== confirmPassword) {
        return res.status(400).json({ success: false, message: 'Passwords do not match.' });
    }
    if (!['Tutor', 'Student'].includes(role)) {
        return res.status(400).json({ success: false, message: "Role must be either 'Tutor' or 'Student'." });
    }
    try {
        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            return res.status(409).json({ success: false, message: 'Email already registered.' });
        }
        const passwordHash = await bcrypt.hash(password, 10);
        const user = await prisma.user.create({
            data: {
                email,
                passwordHash,
                role,
                isVerified: false
            }
        });
        res.status(201).json({ success: true, message: 'Signup successful', user: { email: user.email, id: user.id, role: user.role } });
    } catch (error) {
        console.error('Error Details:', error); // Log full error details
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
export default app;