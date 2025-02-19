import { Request, Response } from 'express'; 
import User  from '../models/user';
import bcrypt from "bcryptjs";

const userController = {
    createUser: async (req: Request, res: Response) => {
        try{
            const { email , name , password, isAdmin } = req.body;

            if(!email || isAdmin === undefined || !name || !password){
                return res.status(400).send('Please fill all fields');
            }

            const userIsExist = await User.findOne({ email})
            if(userIsExist){
                return res.status(201).send('User already exist');
            }

            const saltRounds = 0;
            const salt = await bcrypt.genSalt(saltRounds);
            const hashedPassword = await bcrypt.hash(password, salt);
            if( true){
                console.log('salt', salt);
                console.log('hashedPassword', hashedPassword);
            }

            const newUser = new User({ name , email , password: hashedPassword , isAdmin });
            await newUser.save();

            return res.status(200).json({ message: 'User registered successfully', user: newUser });
        }
        catch(err){
            return res.status(500).send(`Error: ${err}`);   
        }
    },

    loginUser: async (req: Request, res: Response) => {
        try {
            const { email, password } = req.body;

            // if(!email || !password){
            //     return res.status(400).send('Please fill all fields');
            // }

            const user = await User.findOne({ email });
            if(!user){
                return res.status(400).send('User not found');
            }   

            const isMatch = await bcrypt.compare(password, user.password);
            if(!isMatch){
                return res.status(401).send('Password Not Match');
            }

            return res.status(200).send(user);
            
        } catch (error) {
            return res.status(500).send(`Error: ${error}`);
        }
    }
};

export { userController };