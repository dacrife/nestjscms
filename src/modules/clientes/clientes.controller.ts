import {
  Controller,
  Get,
  Res,
  HttpStatus,
  Param,
  NotFoundException,
  Post,
  Body,
  Put,
  Query,
  Delete,
} from '@nestjs/common';
import { ClientesService } from './clientes.service';
import { CreateClienteDto } from './cliente.dto';

@Controller('clientes')
export class ClientesController {
  constructor(private clientesService: ClientesService) {}

  @Get('/')
  async getClientes(@Res() res) {
    const clientes = await this.clientesService.getClientes();
    return res.status(HttpStatus.OK).json({
      message: 'lista de clientes',
      clientes,
    });
  }

  @Get('/:clienteID')
  async getCliente(@Res() res, @Param('clienteID') clienteID) {
    const cliente = await this.clientesService.getCliente(clienteID);
    if (!cliente) throw new NotFoundException('el producto no existe');
    return res.status(HttpStatus.OK).json({
      message: 'cliente por id',
      cliente,
    });
  }

  @Post('/create')
  async createCliente(@Res() res, @Body() createClienteDTO: CreateClienteDto) {
    const clienteCreated = await this.clientesService.createCliente(
      createClienteDTO,
    );
    return res.status(HttpStatus.OK).json({
      message: 'cliente creado',
      clienteCreated,
    });
  }

  @Put('/update')
  async updatedCliente(
    @Res() res,
    @Body() createClienteDTO: CreateClienteDto,
    @Query('clienteID') clienteID,
  ) {
    const clienteUpdated = await this.clientesService.updateCliente(
      clienteID,
      createClienteDTO,
    );
    if (!clienteUpdated) throw new NotFoundException('cliente no existe');
    return res.status(HttpStatus.OK).json({
      message: 'actualizado correctamente',
      clienteUpdated,
    });
  }

  @Delete('/delete')
  async deleteCliente(@Res() res, @Query('clienteID') clienteID) {
    const clienteDelete = await this.clientesService.deleteCliente(clienteID);
    if (!clienteDelete) throw new NotFoundException('Cliente no existe');
    return res.status(HttpStatus.OK).json({
      message: 'producto eliminado satisfactoriamente',
      clienteDelete,
    });
  }
}
