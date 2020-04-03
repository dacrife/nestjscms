import { Injectable, Inject } from '@nestjs/common';
import { Model } from 'mongoose';
import { Cliente } from './cliente.interface';
import { CreateClienteDto } from './cliente.dto';

@Injectable()
export class ClientesService {
  constructor(
    @Inject('CLIENT_MODEL') private readonly clientModel: Model<Cliente>,
  ) {}

  async getClientes(): Promise<Cliente[]> {
    const clientes = await this.clientModel.find();
    return clientes;
  }

  async getCliente(clientID: String): Promise<Cliente> {
    const cliente = await this.clientModel.findById(clientID);
    return cliente;
  }

  async createCliente(createClienteDTO: CreateClienteDto) {
    const newCliente = new this.clientModel(createClienteDTO);
    return await newCliente.save();
  }

  async updateCliente(
    clientID: string,
    createClienteDTO: CreateClienteDto,
  ): Promise<Cliente> {
    const clienteUpdate = this.clientModel.findByIdAndUpdate(
      clientID,
      createClienteDTO,
      { new: true },
    );
    return clienteUpdate;
  }

  async deleteCliente(clientID: string): Promise<Cliente> {
    const deleteCliente = await this.clientModel.findByIdAndDelete(clientID);
    return deleteCliente;
  }
}
