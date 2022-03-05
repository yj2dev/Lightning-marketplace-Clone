import { Module } from '@nestjs/common';
import { ProductFavoriteController } from './controller/product-favorite.controller';
import { ProductFavoriteService } from './service/product-favorite.service';

@Module({
  controllers: [ProductFavoriteController],
  providers: [ProductFavoriteService],
})
export class ProductFavoriteModule {}
