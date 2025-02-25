import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { defaultErrorMessage } from "../constants/error";
import bcrypt from 'bcrypt'
const prisma = new PrismaClient()


interface ICreatedUserPyload {
    username: string 
    email: string 
    password: string 
}

export const register = async (req: Request, res: Response) => {
    try {
        const {username, email, password } = req.body as ICreatedUserPyload

        //CHECKED THE USER EXCISTENS
        const existingUser = await prisma.user.findFirst({
            where: {username}
        })

        if(existingUser){
            res.status(200).json({
                isSuccess: true,
                message: "User is already excisted!"
            })

            return
        }

        //HASHED THE PASSWORD
        const saltRounds = 10
        const hashedPassword = await bcrypt.hash(password, saltRounds)

        const newUser = await prisma.user.create({
            data: {
                username,
                email,
                password: hashedPassword
            }
        })

        res.status(201).json({
            isSuccess: true,
            message: "User successfully created!",
            newUser
        })


    } catch (error) {
        console.log(error)
        res.status(500).json({
            isSuccess: false,
            message: defaultErrorMessage
        })
    }
}

export const login = async (req: Request, res: Response) =>{
    try {
        const { username, password } = req.body

        //Check if the user excisted 
        const userExcisted = await prisma.user.findFirst({
            where: {username, password}
        })

        //Confirm password 

        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            isSuccess: false,
            message: defaultErrorMessage
        })
    }
}