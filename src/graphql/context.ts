import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import logger from '@/logger';

export type TODOContext = {
  userId?: number;
  req: Request;
  res: Response;
};

export const buildContext = async ({
  req,
  res,
}: {
  req: Request;
  res: Response;
}): Promise<TODOContext> => {
  let userId: number | undefined;

  const token = req.headers.authorization || '';
  if (token && token.startsWith('Bearer ')) {
    try {
      const jwtToken = token.replace(/^Bearer\s/, '');
      const decoded = jwt.verify(jwtToken, process.env.ACCESS_KEY!) as { id: number };
      userId = decoded.id;
    } catch (err) {
      logger.info({
        name: 'jwt_error',
        error: err,
      });
    }
  }

  return { userId, req, res };
};
