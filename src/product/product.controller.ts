import {
  Controller,
  Post,
  Res,
  HttpStatus,
  Body,
  Get,
  Delete,
  NotFoundException,
  Query,
  Param,
} from '@nestjs/common';

import { CreateProductDTO } from './dto/product.dto';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Post('/create')
  async createProduct(@Res() res, @Body() createProductDto: CreateProductDTO) {
    const product = await this.productService.createProduct(createProductDto);
    return res.status(HttpStatus.OK).json({
      message: 'todo ok',
      product,
    });
  }

  @Get('/')
  async getProducts(@Res() res) {
    const products = await this.productService.getProducts();
    return res.status(HttpStatus.OK).json(products);
  }

  @Get('/:productID')
  async getProduct(@Res() res, @Param('productID') productID) {
    const product = await this.productService.getProduct(productID);
    if (!product) throw new NotFoundException('product does not exists');
    return res.status(HttpStatus.OK).json({ product });
  }
}
