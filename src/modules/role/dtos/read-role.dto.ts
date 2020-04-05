import { IsString, MaxLength, IsNumber } from 'class-validator';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class ReadRoleDto {
  @Expose()
  @IsNumber()
  readonly id: number;

  @Expose()
  @IsString()
  @MaxLength(50, { message: 'Este nombre no es valido' })
  readonly name: string;

  @Expose()
  @IsString()
  @MaxLength(100, {
    message: 'Esta descripcion es muy larga, max 100 caracteres',
  })
  readonly description: string;
}
