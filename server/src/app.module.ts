import { ConfigModule } from '@nestjs/config';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StoreController } from './store/controller/store.controller';
import { UserService } from './store/service/user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { UserModule } from './store/user.module';
import * as mongoose from 'mongoose';
import { User, UserSchema } from './store/model/user.model';
import { UserRepository } from './store/repository/user.repository';
import { AuthModule } from './auth/auth.module';
import { ProductModule } from './product/product.module';
import { OauthModule } from './oauth/oauth.module';
import { SmsModule } from './sms/sms.module';
import { RedisCacheModule } from './redis-cache/redis-cache.module';
import { ProductImageModule } from './product-image/product-image.module';
import { HashtagModule } from './hashtag/hashtag.module';
import { StoreContactModule } from './store-contact/store-contact.module';

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
    HashtagModule,
    StoreContactModule,
  ],
  controllers: [AppController, StoreController],
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
