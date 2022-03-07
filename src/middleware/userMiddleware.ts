import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { User } from '../models/User'
import bcrypt from 'bcryptjs'
import { expression } from 'joi'

export const getUsers = async (req: Request, res: Response) => {
    try {
        const Users = await User.find()
        res.json(Users)
    } catch (error) {
        res.json(error)
    }
}

export const createUser = async (req: Request, res: Response) => {
    try {
    //find an existing user
     let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send("User already registered.");
    
    user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
    });
    
    user.password = await bcrypt.hash(user.password, 10);
        await user.save();
        res.json(user)
    } catch (error) {
        console.log(error)
    }
}

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const existingUser = await User.findOne({ email })
        if (!existingUser) {
            console.log('email not registered')
        }
        const validPassword = await bcrypt.compareSync(password, existingUser.password)
        if (!validPassword) {
            res.json('not valid')
            return
        }
        console.log('valid')
        const payload = {
            id: existingUser?._id,
            firstName: existingUser?.firstName,
            email: existingUser?.email,
            role: existingUser?.role
        }
        const userToken = jwt.sign(payload, process.env.PRIVATEKEY as string)
        res.json(userToken)
    } catch (error) {
        console.log(error)
    }
}