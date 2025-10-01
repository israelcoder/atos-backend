import jwt from 'jsonwebtoken';
export async function authenticateToken(req, reply) {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader?.split(' ')[1];
    console.log(authHeader);

    if (!token) {
      return reply.status(401).send({ error: 'Token não fornecido' });
    }
    const user = jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return reply.status(403).send({ message: 'Token inválido' });
      }
      console.log(user);
      req.user = user;
    });
  } catch (error) {
    return reply.status(403).send({ message: 'Token invalido' });
  }
}

export function authorizeAdmin(req, reply, done) {
  if (req.user.role !== 'admin') {
    return reply.status(403).send({ message: 'Acesso negado' });
  }
  done();
}
