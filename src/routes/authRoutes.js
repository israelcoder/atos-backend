import {userRegister, userLogin} from "../controllers/userController.js"
import { confirmEmail } from "../controllers/confirmEmail.js"


export default function authRoutes(app) {
    app.post('/confirm-email',confirmEmail)
    app.post("/register",userRegister)
    app.post("/login",userLogin)
}