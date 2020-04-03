import { Connection } from 'mongoose';
import { ClienteSchema } from './cliente.schema';

export const clientProvider = [
  {
    provide: 'CLIENT_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('clientes', ClienteSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
