import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductImage, ProductImageSchema } from './model/product-image.model';
import { ProductModule } from '../product/product.module';

@Module({})
export class ProductImageModule {}
