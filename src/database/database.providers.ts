import { createConnection } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: async () =>
      await createConnection({
        type: 'mongodb',
        host:
          'mongodb+srv://root:root@cluster1-knttg.mongodb.net/test?retryWrites=true&w=majority',
        database: 'nestjscms_db',
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        synchronize: true,
      }),
  },
];
