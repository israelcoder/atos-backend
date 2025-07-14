import { registerUser } from "../services/userService.js"
import prisma from "../../lib/prisma.js"


export async function confirmEmail(req, reply){
    const{email, token} = req.body

    if(!email || !token){
        return reply.status(400).send({error:'Email e token são obrigatórios. '})
    }
    
    const pendingUsers = await prisma.users.findUnique({
        where:{email}
    })

    console.log("Recuperado em confirmEmail:", pendingUsers)
    if(!pendingUsers){
        await prisma.users.delete({
            where:{email: email}
        })
        return reply.status(400).status({error:'Usuario não encontrado ou token expirado. '})

    }

    if(pendingUsers.verification_token !== token){
        console.log(`
            verificationToken: ${pendingUsers.verification_token},
            token:${token}
            `)

        await prisma.users.delete({
            where:{email: email}
        })
        
        return reply.status(400).send({error:'Token invalido.'})
    }

    try{
        await prisma.users.update({
            where:{email},
            data: {
                email_verified: true
            }
        })

        return reply.send({message:'Email verificado com sucesso.'})
    }catch(error){
        return reply.status(400).send("aqui",{error: error.message})
    }
}