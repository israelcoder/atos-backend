import jwt from 'jsonwebtoken'
export async function authenticateToken(req, reply, done){
    const authHeader = req.headers.authorization
    const token = authHeader?.split(' ')[1]

    if(!token){
        return reply.status(401).send({error: 'Token não fornecido'})
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, user) =>{
        if (err){
            return reply.status(403).send({error:'Token inválido'})
        }
        console.log(user)
        req.user = user
    })
}

export function authorizeAdmin(req,reply,done){
    if(req.user.role !== 'admin') {
        return reply.status(403).send({error:'Acesso negado'})  
    }
    done()
}