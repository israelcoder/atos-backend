import { registerUser } from "../services/userService.js"
import { pendingUsers} from "../controllers/userController.js"


export async function confirmEmail(req, reply){
    const{email, token} = req.body

    if(!email || !token){
        return reply.status(400).send({error:'Email e token são obrigatórios. '})
    }
    
    const userData = pendingUsers[email]
    console.log("Recuperado em confirmEmail:", userData)
    if(!userData){
        return reply.status(400).status({error:'Usuario não encontrado ou token expirado. '})
    }

    if(userData.verificationToken !== token){
        return reply.status(400).send({error:'Token invalido. '})
    }

    try{
        await registerUser(userData.name, userData.email, userData.password, userData.role,userData.verificationToken,userData.email_verified, userData.tenantId)

        delete pendingUsers[email]

        return reply.send({message:'Email verificado e usuario criado com sucesso'})
    }catch(error){
        return reply.status(400).send({error: error.message})
    }
}