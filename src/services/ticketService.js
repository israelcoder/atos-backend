import {db} from "../config/database.js"

export async function createTicket(title, description, userId){
    const [result] = await db.query(
        "INSERT INTO chamados (title, description, user_id) VALUES(?, ?, ?)",[title, description, userId]
    )
    return result.insertId
}

export async function getTickets(){
   try {
    const [tickets] = await db.query("SELECT * FROM  chamados")
    return tickets || []
   } catch(error){
    throw new Error('Erro ao buscar tickets' + error.message)
   }
}
export async function getTicketsById(ticketId){
    const [tickets] = await db.query("SELECT * FROM  chamados WHERE id = ?",[ticketId])
    return tickets[0]
}

export async function updateTicket(ticketId, status, assignedTo){
    console.log("status recebido: ",status)
    console.log("id do chamado: ",ticketId)
    const [result] = await db.query(
        "UPDATE  chamados SET status = ?, assigned_to = ? WHERE id = ?",[status,assignedTo, ticketId]
    )
    return result.affectedRows
}

export async function deleteTicket(ticketId){
    const [result] = await db.query("DELETE FROM chamados WHERE id = ?",[ticketId])
    return result.affectedRows
}