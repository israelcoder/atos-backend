// import {createTicket, getTickets, getTicketsById, updateTicket, deleteTicket} from "../services/ticketService.js"
import {authenticateToken} from "../middlewares/authMiddleware.js"
import {createTicketController, getTicketsController, getTicketsByIdController,updateTicketController, deleteTicketController, updateTicketContentController} from "../controllers/ticketController.js"

export default function ticketRoutes(app) {

    app.post("/tickets",{preHandler: authenticateToken},createTicketController)
    app.get("/tickets",getTicketsController)
    app.get("/tickets/:id",getTicketsByIdController)
    app.put("/tickets/:id",{preHandler: authenticateToken},updateTicketController)
    app.put("/tickets/updateContent/:id",{preHandler: authenticateToken},updateTicketContentController)
    app.delete("/tickets/:id",{preHandler: authenticateToken},deleteTicketController)
}
