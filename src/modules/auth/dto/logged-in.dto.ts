import { ReadUserDto } from '../../user/dto/read-user.dto';
import { IsString } from 'class-validator';
import { Expose, Type, Exclude } from 'class-transformer';

@Exclude()
export class LoggedInDto {
  @Expose()
  @IsString()
  token: string;

  @Expose()
  @Type(() => ReadUserDto)
  user: ReadUserDto;
}
