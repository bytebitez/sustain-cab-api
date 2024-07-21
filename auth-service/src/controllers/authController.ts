import { FastifyInstance } from 'fastify';
import { AuthService } from '../services/authService';
import { ObjectId } from 'mongodb';

const authService = new AuthService();

export async function loginHandler(request: any, reply: any) {
  const { email, password } = request.body as { email: string; password: string };
  const result = await authService.login(request.server, email, password);
  return result;
}

export async function registerHandler(request: any, reply: any) {
  const { username, email, password } = request.body as { username: string; email: string; password: string };
  const result = await authService.register(request.server, username, email, password);
  return result;
}

export async function changePasswordHandler(request: any, reply: any) {
  const { oldPassword, newPassword } = request.body as { oldPassword: string; newPassword: string };
  const userId = request.user?.id; // Assuming user ID is available in request context
  if (!userId) {
    reply.status(401).send({ error: 'Unauthorized' });
    return;
  }
  const result = await authService.changePassword(request.server, new ObjectId(userId), oldPassword, newPassword);
  return result;
}

export async function forgotPasswordHandler(request: any, reply: any) {
  const { email } = request.body as { email: string };
  const result = await authService.forgotPassword(request.server, email);
  return result;
}

export async function resetPasswordHandler(request: any, reply: any) {
  const { token, newPassword } = request.body as { token: string; newPassword: string };
  const result = await authService.resetPassword(request.server, token, newPassword);
  return result;
}
