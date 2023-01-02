import { User } from '../../models/Categories';

export const users: { [key: string]: User } = {
  user: {
    name: 'User',
    role: 'user'
  },
  admin: {
    name: 'Admin',
    role: 'admin'
  }
};
