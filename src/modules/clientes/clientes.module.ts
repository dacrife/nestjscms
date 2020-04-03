import { Module } from '@nestjs/common';
import { ClientesService } from './clientes.service';
import { DatabaseModule } from 'src/database/database.module';
import { ClientesController } from './clientes.controller';
import { clientProvider } from './client.provider';

@Module({
  imports: [DatabaseModule],
  providers: [ClientesService, ...clientProvider],
  controllers: [ClientesController],
})
export class ClientesModule {}
