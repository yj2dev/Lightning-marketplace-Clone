import { ConfigModule } from '@nestjs/config';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './user/controller/user.controller';
import { UserService } from './user/service/user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { UserModule } from './user/user.module';
import * as mongoose from 'mongoose';
import { User, UserSchema } from './user/model/user.model';
import { UserRepository } from './user/repository/user.repository';
import { AuthModule } from './auth/auth.module';
import { ProductModule } from './product/product.module';
import { OauthModule } from './oauth/oauth.module';
import { SmsModule } from './sms/sms.module';
import { RedisCacheModule } from './redis-cache/redis-cache.module';
import { ProductImageModule } from './product-image/product-image.module';
import { ProductContactModule } from './product-contact/product-contact.module';
import { ProductFavoriteModule } from './product-favorite/product-favorite.module';
import { StoreReviewModule } from './store-review/store-review.module';
import { TagModule } from './tag/tag.module';
import { PollowModule } from './pollow/pollow.module';
import { CategoryModule } from './category/category.module';
import { TalkModule } from './talk/talk.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forRoot(
      `mongodb+srv://${process.env.DB_MONGO_ID}:${process.env.DB_MONGO_PASSWORD}@table0.zotlh.mongodb.net/${process.env.DB_MONGO_NAME}?retryWrites=true&w=majority`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
      },
    ),
    UserModule,
    AuthModule,
    ProductModule,
    OauthModule,
    SmsModule,
    RedisCacheModule,
    ProductImageModule,
    ProductContactModule,
    ProductFavoriteModule,
    StoreReviewModule,
    TagModule,
    PollowModule,
    CategoryModule,
    TalkModule,
  ],
  controllers: [AppController, UserController],
  providers: [AppService, UserService, UserRepository],
})
export class AppModule implements NestModule {
  private readonly MODE: boolean =
    process.env.NODE_ENV === 'development' ? true : false;

  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
    // 개발시 몽구스 쿼리 확인
    mongoose.set('debug', this.MODE);
  }
}
