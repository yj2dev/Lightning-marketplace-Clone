import { forwardRef, Module } from '@nestjs/common';
import { UserController } from './controller/user.controller';
import { UserService } from './service/user.service';
import { getConnectionToken, MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './model/user.model';
import { UserRepository } from './repository/user.repository';
import { AuthModule } from '../auth/auth.module';
import { MulterModule } from '@nestjs/platform-express';
import { FollowModule } from '../follow/follow.module';
import {
  StoreContact,
  StoreContactSchema,
} from '../store-contact/model/store-contact.model';
import {
  StoreReview,
  StoreReviewSchema,
} from '../store-review/model/store-review.model';

// MulterModule.register({ dest: './upload' }),
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: StoreContact.name, schema: StoreContactSchema },
      { name: StoreReview.name, schema: StoreReviewSchema },
    ]),
    forwardRef(() => FollowModule),
    forwardRef(() => AuthModule),
  ],
  controllers: [UserController],
  providers: [UserService, UserRepository],
  exports: [UserService, UserRepository],
})
export class UserModule {}
