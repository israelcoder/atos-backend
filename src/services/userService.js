import {db} from '../config/database.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'


import dotenv from 'dotenv'
dotenv.config()

export async function registerUser(name, email, password, role, verificationToken){
    const hashedPassword = await bcrypt.hash(password,10)

    // Insere o usuario com o token e email_verified como false
    const [result] = await db.query(
        "INSERT INTO users (name, email, password, role, verification_token, email_verified) VALUES (?, ?, ?, ?, ?, ?)",[name, email, hashedPassword, role,verificationToken, false]
    )
    return result
}

export async function loginUser(email, password){
    const [users] = await db.query("SELECT * FROM users WHERE email =?", [email])
    if(users.length === 0) throw new Error("Usuário não encontrado")

    const user = users[0]
    const match = await bcrypt.compare(password, user.password)
    console.log("Senha recebida:", password);
    console.log("Senha armazenada no banco:", user.password);
    console.log("Match:", match);
    if(!match) throw new Error("Senha inválida")

        const token = jwt.sign({id: user.id, role: user.role}, process.env.JWT_SECRET, {expiresIn:'1h'})
        return{token, user}
}


export async function verifyEmailToken(email, token){
    // Busca o usuario pelo email

    const [users] = await db.query(
        `SELECT * FROM users WHERE email = ?`, [email]
    )

    if(users.length === 0) {
        throw new Error('Usuário não encontrado.')
    }

    //Verifica o token
    if(user.verification_token !== token){
        throw new Error ('Token inválido.')
    }

    // Atualiza o status de verificação e limpa o Token
    await db.query(
        `UPDATE users SET email_verified = ?, verification_token = NULL WHERE email = ?`,[true, email] 
    )

    return{message:'Email verificado com sucesso!'}


}