import { IsString, MaxLength } from 'class-validator';

export class UpdateRoleDto {
  @IsString()
  @MaxLength(50, { message: 'Este nombre no es valido' })
  readonly name: string;

  @IsString()
  @MaxLength(100, {
    message: 'Esta descripcion es muy larga, max 100 caracteres',
  })
  readonly description: string;
}
