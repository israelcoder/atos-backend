import prisma from '../../lib/prisma.js';

export async function cleanupPendingUsers() {
  const oneHourAgo = new Date(Date.now() - 60 * 30 * 1000);
  // const oneHourAgo = new Date('2025-07-22T02:45:00Z')
  const deleted = await prisma.users.deleteMany({
    where: {
      email_verified: false,
      createdAt: {
        lt: oneHourAgo,
      },
    },
  });
  //     console.log('oneHourAgo:', oneHourAgo.toISOString())
  //    console.log(`🧹 ${deleted.count} usuários pendentes excluídos por falta de verificação.`)
}
cleanupPendingUsers();
