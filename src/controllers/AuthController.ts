import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { CheckUserPassword } from "../utils/HashPassword";
import { generateJWToken } from "../utils/JWT";

const prisma = new PrismaClient();

class AuthController{
    constructor(){

    }
    async signIn(req: Request, res: Response){
        try{
            const { email, password } = req.body;

            if(!email || !password){
                return res.json({
                    status: 400,
                    message: "Email ou senha não informados."
                })
            }

            const user = await prisma.user.findFirst({
                where: {
                    email
                }
            })

            if(!user){
                return res.json({
                    status: 404,
                    message: "Um usuario com este email não existe."
                })
            }
            
            const passwordChecks = await CheckUserPassword(password, user.password)

            if(!passwordChecks){
                return res.json({
                    status: 401,
                    message: "Senha incorreta."
                })
            }

            const token = generateJWToken(user)
            return res.json({
                status: 200,
                user:{
                    token
                }, 
                message: "Autenticação bem sucedida."
            })

        }catch(error){
            console.log(error);
            return res.status(500).json({
                error: error
            })
        }
        
        
    }
    async signUp(req: Request, res: Response){
        try{
        const newUser = req.body
        if(newUser.password !== newUser.confirmarSenha){
            return res.json({
                status: 400,
                message: "As senhas devem ser iguais"
            })
        }

        }catch(error){
            console.log(error);
            return res.status(500).json({
                error: error
            })
        }
        

    }
    async signOut(){

    }
}

export default new AuthController()