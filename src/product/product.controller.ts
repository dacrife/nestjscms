import { Controller, Post, Res, HttpStatus, Body } from '@nestjs/common';
import { CreateProductDTO } from './dto/product.dto';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Post('/create')
  async createPost(@Res() res, @Body() createProductDto: CreateProductDTO) {
    const product = await this.productService.createProduct(createProductDto);
    return res.status(HttpStatus.OK).json({
      message: 'todo ok',
      product: product,
    });
  }
}
