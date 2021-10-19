import { sign } from 'jsonwebtoken';
import { pick } from 'lodash';
import { SECRET } from '../config';

export const issueAuthToken = async (jwtPayload: string) => {
  const token = await sign(jwtPayload, SECRET, {
    expiresIn: 3600 * 24,
  });
  return `Bearer ${token}`;
};

export const serializeUser = user => pick(user, ['id', 'email', 'username', 'lastName', 'firstName']);
