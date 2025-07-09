import {createTicket, getTickets, getTicketsById, updateTicket, deleteTicket, updateTicketContent} from "../services/ticketService.js"

    export async function createTicketController(req, reply){
        console.log('Criando chamado...')
        try{
            const {title, description} = req.body
            console.log("Usuário autenticado:", req.user);

            const userId = req.user.id
            const tenantId = req.user.tenantId

            const ticket = await createTicket({title, description, userId,tenantId})
            console.log(ticket)
            return reply.status(201).send({message:"Chamado criado!", ticket})
        } catch (error){
            console.log("aqui")
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

    export async function updateTicketContentController(req,reply){
        const userRole = req.user.role
        try {
            if(userRole !== "usuario"){
                return reply.status(403).send({error:"acesso negado"})
            }

            const {title, description} = req.body
            const ticketId =req.params.id
            const userId = req.user.id
            const affectedRows = await updateTicketContent(userId, title, description, ticketId)

            if(affectedRows === 0 ) return reply.status(404).send({error: "Chamado não encontrado"})
            return reply.send({message:"Chamado atualizado!"})
        } catch(error){
            return reply.status(400).send({error: error.message})
        }
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
