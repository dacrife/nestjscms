import { ReadUserDto } from '../../user/dto/read-user.dto';
import { IsNumber, IsString } from 'class-validator';
import { Expose, Type, Exclude } from 'class-transformer';

@Exclude()
export class ReadBookDto {
  @Expose()
  @IsNumber()
  readonly id: number;

  @Expose()
  @IsString()
  readonly name: string;

  @Expose()
  @IsString()
  readonly description: string;

  @Expose()
  @Type(type => ReadUserDto)
  readonly authors: ReadUserDto[];
}
