import {
  userRegister,
  userLogin,
  userSoftDelete,
} from '../controllers/userController.js';
import { authenticateToken } from '../middlewares/authMiddleware.js';
import { confirmEmail } from '../controllers/confirmEmail.js';

export default function authRoutes(app) {
  app.post('/confirm-email', confirmEmail);
  app.post('/register', userRegister);
  app.post('/login', userLogin);
  app.delete('/users/:id', { preHandler: authenticateToken }, userSoftDelete);
}
