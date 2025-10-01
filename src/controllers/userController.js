import {
  registerUser,
  loginUser,
  softDeleteUser,
} from '../services/userService.js';
import { verifyEmailToken } from '../services/userService.js';
import { generateToken } from '../utils/generateToken.js';
import { sendEmail } from '../utils/sendEmail.js';
// import {db} from '../config/database.js';
import prisma from '../../lib/prisma.js';

export let pendingUsers = {};

export async function userRegister(req, reply) {
  const { name, email, password, role, email_verified, tenantId } = req.body;
  if (!name || !email || !password || !role || !tenantId) {
    return reply
      .status(400)
      .send({ error: 'Todos os campos são obrigatórios!' });
  }
  try {
    const userExists = await prisma.users.findUnique({
      where: { email: email },
    });

    if (userExists) throw new Error('Usuario já registrado');
    const verificationToken = generateToken(8);

    //salva os dados temporariamente
    // pendingUsers[email] = {name, email, password, role, verificationToken,email_verified, tenantId}

    pendingUsers = await registerUser(
      name,
      email,
      password,
      role,
      verificationToken,
      email_verified,
      tenantId,
    );

    await sendEmail(
      email,
      'Código de verificação - ATOS',
      `Seu código de verificação é: ${verificationToken}`,
    );
    return reply.status(200).send({ message: 'Token enviado por email.' });
  } catch (error) {
    console.error('Erro no registro', error);
    return reply.status(400).send({ error: error.message });
  }
}

export async function userSoftDelete(req, reply) {
  const userRole = req.user.role;
  const userId = req.params.id;
  const tenantId = req.user.tenantId;

  try {
    if (userRole !== 'admin') {
      return reply
        .status(403)
        .send({
          error:
            'Apenas administradores tem permissão para inativar de usuarios',
        });
    }
    await softDeleteUser(userId, tenantId);
    return reply.send({ message: 'Usuario Inativado com sucesso' });
  } catch (error) {
    return reply.status(400).send({ error: error.message });
  }
}

export async function userLogin(req, reply) {
  try {
    const { email, password } = req.body;
    const data = await loginUser(email, password);
    return reply.send(data);
  } catch (error) {
    return reply.status(400).send({ error: error.message });
  }
}

export async function confirmEmail(req, reply) {
  const { email, token } = req.body;

  if (!email || !token) {
    return reply
      .status(400)
      .send({ error: 'E-mail e token são obrigatórios.' });
  }

  try {
    const result = await verifyEmailToken(email, token);
    return reply.send(result);
  } catch (error) {
    return reply.status(400).send({ error: error.message });
  }
}
