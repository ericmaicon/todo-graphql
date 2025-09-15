import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import * as userData from '@/data/user';
import AppError from '@/error/AppError';

type Response = {
  accessToken: string;
  refreshToken: string;
};

export default async function signIn(username: string, password: string): Promise<Response> {
  const user = await userData.getOne({ username });

  if (!user) {
    throw new AppError('User not found.');
  }

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    throw new AppError('Invalid Credentials.');
  }

  const accessToken = jwt.sign({ id: user.id }, process.env.ACCESS_KEY!, { expiresIn: '1d' });
  const refreshToken = jwt.sign({ id: user.id }, process.env.REFRESH_KEY!, { expiresIn: '15m' });

  return { accessToken, refreshToken };
}
