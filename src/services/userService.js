import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../../lib/prisma.js';

export async function registerUser(
  name,
  email,
  password,
  role,
  verificationToken,
  email_verified,
  tenantId,
) {
  const hashedPassword = await bcrypt.hash(password, 10);

  // Insere o usuario com o token e email_verified como false
  const user = await prisma.users.create({
    data: {
      name,
      email,
      password: hashedPassword,
      role,
      verification_token: verificationToken,
      email_verified,
      tenantId,
    },
  });
  return user;
}

export async function loginUser(email, password) {
  const user = await prisma.users.findUnique({
    where: { email },
  });

  if (!user) throw new Error('Usuário não encontrado.');
  if (user.email_verified !== true) throw new Error('Usuario não verificado.');
  if (user.active !== true) throw new Error('Usuario inativo!');

  const match = await bcrypt.compare(password, user.password);
  if (!match) throw new Error('Senha invalida.');

  const token = jwt.sign(
    { id: user.id, role: user.role, tenantId: user.tenantId },
    process.env.JWT_SECRET,
    { expiresIn: '1h' },
  );
  return { token, user };
}

export async function softDeleteUser(id, tenantId) {
  if (!id || !tenantId) {
    throw new Error('ID e tenantId são obrigatórios.');
  }
  try {
    const result = await prisma.users.updateMany({
      where: {
        id: id,
        tenantId: tenantId,
      },
      data: {
        active: false,
      },
    });
    if (result.count === 0) {
      throw new Error('usuario não encontrado');
    }
    return { message: 'Usuario desativado com sucesso' };
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function verifyEmailToken(email, token) {
  // Busca o usuario pelo email
  const user = await prisma.users.findUnique({
    where: { email },
  });

  if (user.verification_token !== token) {
    throw new Error('Token invalido.');
  }

  await prisma.users.update({
    where: { email },
    data: {
      email_verified: true,
      verification_token: null,
    },
  });

  return {
    message: 'Email verificado com sucesso!',
  };
}
