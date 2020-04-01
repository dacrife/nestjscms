import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { DatabaseModule } from '../../database/database.module';
import { productsProviders } from './product.providers';

@Module({
  imports: [DatabaseModule],
  providers: [ProductService, ...productsProviders],
  controllers: [ProductController],
})
export class ProductModule {}
