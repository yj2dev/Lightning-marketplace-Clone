import { Module } from '@nestjs/common';
import { ProductController } from './controller/product.controller';
import { ProductService } from './service/product.service';
import { ProductRepository } from './repository/product.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../user/model/user.model';
import { Product, ProductSchema } from './model/product.model';
import {
  ProductImage,
  ProductImageSchema,
} from '../product-image/model/product-image.model';
import { Tag, TagSchema } from '../tag/model/tag.model';
import { TagModule } from '../tag/tag.module';
import {
  ProductFavorite,
  ProductFavoriteSchema,
} from '../product-favorite/model/product-favorite.model';
import {
  ProductContact,
  ProductContactSchema,
} from '../product-contact/model/product-contact.model';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Product.name, schema: ProductSchema },
      { name: ProductImage.name, schema: ProductImageSchema },
      { name: ProductFavorite.name, schema: ProductFavoriteSchema },
      { name: ProductContact.name, schema: ProductContactSchema },
      { name: Tag.name, schema: TagSchema },
    ]),
    TagModule,
  ],
  controllers: [ProductController],
  providers: [ProductService, ProductRepository],
})
export class ProductModule {}
