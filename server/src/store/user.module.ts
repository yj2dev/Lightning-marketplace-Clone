import { forwardRef, Module } from '@nestjs/common';
import { StoreController } from './controller/store.controller';
import { UserService } from './service/user.service';
import { getConnectionToken, MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './model/user.model';
import { UserRepository } from './repository/user.repository';
import { AuthModule } from '../auth/auth.module';
import { MulterModule } from '@nestjs/platform-express';
import { Product, ProductSchema } from '../product/model/product.model';

@Module({
  imports: [
    MulterModule.register({ dest: './upload' }),
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Product.name, schema: ProductSchema },
    ]),

    forwardRef(() => AuthModule),
  ],
  controllers: [StoreController],
  providers: [UserService, UserRepository],
  exports: [UserService, UserRepository],
})
export class UserModule {}
