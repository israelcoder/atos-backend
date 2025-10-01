// import {db} from "../config/database.js"
import prisma from '../../lib/prisma.js';

export function genTck() {
  const chars =
    'BCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&*()-_+=?';
  let random = '';
  for (let i = 0; i < 5; i++) {
    random += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `TCK-${random}`;
}

export async function createTicket({ title, description, userId, tenantId }) {
  const tck = genTck();
  const ticket = await prisma.chamados.create({
    data: {
      title,
      description,
      userId,
      tenantId: tenantId,
      status: 'aberto',
      ticket: tck,
    },
  });
  return ticket;
}

export async function getTickets() {
  try {
    const tickets = await prisma.chamados.findMany({});
    return tickets || [];
  } catch (error) {
    throw new Error('Erro ao buscar tickets:' + error.message);
  }
}
export async function getTicketsById(ticketId) {
  const tickets = await prisma.chamados.findUnique({
    where: { id: ticketId },
  });
  return tickets;
}

export async function updateTicketContent(
  userId,
  title,
  description,
  ticketId,
) {
  try {
    const ticket = await prisma.chamados.findUnique({
      where: { id: ticketId },
    });
    if (!ticket) throw new Error('chamado não encontrado');
    if (ticket.userId !== userId)
      throw new Error('voce não tem permissão para editar este chamado');
    const result = await prisma.chamados.update({
      where: { id: ticketId },
      data: { id: userId, title, description },
    });
    return result;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function updateTicket(ticketId, status) {
  console.log('status recebido: ', status);
  console.log('id do chamado: ', ticketId);
  if (!status) throw new Error('campos vazios');

  try {
    const result = await prisma.chamados.update({
      where: { id: ticketId },
      data: { status },
    });
    return result;
  } catch (error) {
    throw new Error('chamado não encontrado.');
  }
}

export async function deleteTicket(ticketId) {
  try {
    const result = await prisma.chamados.delete({
      where: { id: ticketId },
    });
    return result;
  } catch (error) {
    throw new Error('chamado não encontrado.');
  }
}
