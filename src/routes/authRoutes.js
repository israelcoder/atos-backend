import { confirmEmail } from '../controllers/confirmEmail.js';
import { userLogin, userRegister } from '../controllers/userController.js';

export default function authRoutes(app) {
  app.post('/confirm-email', confirmEmail);
  app.post('/register', userRegister);
  app.post('/login', userLogin);
}
