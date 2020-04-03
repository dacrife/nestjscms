import { Schema } from 'mongoose';

export const ClienteSchema = new Schema({
  nombre: String,
  apellido: String,
  ccnit: String,
  tel_wap: Number,
  email: String,
  cod_cliente: String,
});
