import { sign } from 'jsonwebtoken';
import { pick } from 'lodash';
import { SECRET } from '../config';
import { User } from '../models/User';

export const issueAuthToken = async (jwtPayload: string) => {
  const token = await sign(jwtPayload, SECRET, {
    expiresIn: 3600 * 24,
  });
  return `Bearer ${token}`;
};

export const serializeUser = (user: User) => pick(user, ['id', 'email', 'lastName', 'firstName']);
