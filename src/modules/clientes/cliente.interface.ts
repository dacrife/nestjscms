import { Document } from 'mongoose';

export interface Cliente extends Document {
  readonly nombre: string;
  readonly apellido: string;
  readonly email: string;
  readonly ccnit: number;
  readonly tel_wap: number;
  readonly cod_cliente: number;
}
