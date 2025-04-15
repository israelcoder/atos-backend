import {createTicket, getTickets, getTicketsById, updateTicket, deleteTicket} from "../services/ticketService.js"

    export async function createTicketController(req, reply){
        console.log('Criando chamado...')
        try{
            const {title, description} = req.body
            const userId = req.user.id
            const ticketId = await createTicket(title, description, userId)
            console.log(ticketId)
            return reply.status(201).send({message:"Chamado criado!", ticketId})
        } catch (error){
            return reply.status(400).send({error: error.message})
        }
    }

    export async function getTicketsController(req, reply) {
        const tickets = await getTickets()
        return reply.send(tickets)
    }

    export async function getTicketsByIdController(req, reply) {
        const ticket = await getTicketsById(req.params.id)
        if (!ticket) return reply.status(404).send({error: "Chamado não encontrado"})
        return reply.send(ticket)
    }

    export async function updateTicketController (req, reply) {
        const userRole = req.user.role
        try {
            if(userRole !== "tecnico"){
                return reply.status(403).send({error:"acesso negado"})
            }

            const {status, assignedTo} = req.body
            const affectedRows = await updateTicket(req.params.id, status, assignedTo)

            if(affectedRows === 0 ) return reply.status(404).send({error: "Chamado não encontrado"})
            return reply.send({message:"Chamado atualizado!"})
        } catch(error){
            return reply.status(400).send({error: error.message})
        }
    }

    export async function deleteTicketController (req, reply) {
        const userRole = req.user.role
        try {
            if(userRole !== "admin"){
                return reply.status(403).send({error:"Apenas administradores tem permissão para deleção de chamados"})
            }
            const affectedRows = await deleteTicket(req.params.id)
            if (affectedRows === 0) return reply.status(404).send({error:"Chamado não encontrado"})
            return reply.send({message:"Chamado deletado!"})
        } catch (error){
            return reply.status(400).send({error:error.message})
        }
    }
