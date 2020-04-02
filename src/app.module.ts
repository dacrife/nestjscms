import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './modules/product/product.module';
import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';
import { Configuration } from './config/config.keys';
import { DatabaseModule } from './database/database.module';
import { RoleModule } from './modules/role/role.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
@Module({
  imports: [
    DatabaseModule,
    ProductModule,
    ConfigModule,
    RoleModule,
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  static port: number | string;

  constructor(private readonly _configService: ConfigService) {
    AppModule.port = this._configService.get(Configuration.PORT);
  }
}
