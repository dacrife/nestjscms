import { Injectable, Inject } from '@nestjs/common';

import { Model } from 'mongoose';

import { Product } from './interfaces/product.interface';
import { CreateProductDTO } from './dto/product.dto';

@Injectable()
export class ProductService {
  constructor(
    @Inject('PRODUCT_MODEL')
    private readonly productModel: Model<Product>,
  ) {}

  async getProducts(): Promise<Product[]> {
    const products = await this.productModel.find();
    return products;
  }

  async getProduct(productID: string): Promise<Product> {
    const product = await this.productModel.findById(productID);
    return product;
  }

  async createProduct(createdProductDto: CreateProductDTO): Promise<Product> {
    const product = new this.productModel(createdProductDto);
    return await product.save();
  }

  async deleteProduct(prodcutID: string): Promise<Product> {
    const deletedproduct = await this.productModel.findByIdAndDelete(prodcutID);
    return deletedproduct;
  }

  async updateProduct(
    productID: string,
    createdProductDto: CreateProductDTO,
  ): Promise<Product> {
    const updatedProduct = this.productModel.findByIdAndUpdate(
      productID,
      createdProductDto,
      { new: true },
    );
    return updatedProduct;
  }
}
