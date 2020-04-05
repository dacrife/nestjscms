import { IsNumber, IsEmail } from 'class-validator';
import { ReadUserDetailDto } from './read-user-details.dto';
import { Type } from 'class-transformer';
import { Exclude, Expose } from 'class-transformer';
import { ReadRoleDto } from '../../role/dtos/read-role.dto';

@Exclude()
export class ReadUserDto {
  @Expose()
  @IsNumber()
  readonly id: number;

  @Expose()
  @IsEmail()
  readonly email: string;

  @Expose()
  @IsEmail()
  readonly username: string;

  @Expose()
  @Type(type => ReadUserDetailDto)
  readonly details: ReadUserDetailDto;

  @Expose()
  @Type(type => ReadRoleDto)
  readonly roles: ReadRoleDto[];
}
