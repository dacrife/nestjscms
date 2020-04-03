import { Connection } from 'mongoose';
import { UserSchema } from './user.schema';

export const productsProviders = [
  {
    provide: 'USER_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('users', UserSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
