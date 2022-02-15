import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaOptions, Types } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { timestamp } from 'rxjs';

const options: SchemaOptions = {
  timestamps: true,
  versionKey: false,
};

@Schema(options)
export class User extends Document {
  @ApiProperty({
    example: '01012345678',
    description: '유저 인증된 전화번호',
    required: true,
  })
  @Prop({ required: true })
  @IsString()
  @IsNotEmpty()
  phoneNumber: string;

  @ApiProperty({
    example: 'Encrypted password',
    description: '유저 비밀번호',
    required: true,
  })
  @Prop({ required: true })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    example: '상점1004호',
    description: '상점명',
    required: true,
  })
  @Prop({ required: true, unique: true })
  @IsString()
  @IsNotEmpty()
  storeName: string;

  @ApiProperty({
    example: '이미지 파일',
    description: '상점 프로필 이미지',
    required: true,
  })
  @Prop({
    default:
      'https://localhost:8000/static/user_profile/__default_store_profile__.png',
  })
  @IsString()
  profileURL: string;

  @ApiProperty({
    example: '상품',
    description: '유저가 등록한 상품들',
    required: true,
  })
  @Prop({ type: Types.ObjectId, ref: 'products' })
  @IsString()
  product: string;

  @ApiProperty({
    example: '카카오 아이디',
    description: '소셜 로그인 계정 통합',
    required: true,
  })
  @Prop({ unique: true })
  @IsString()
  kakaoId: string;

  @ApiProperty({
    example: '페이스북 아이디',
    description: '소셜 로그인 계정 통합',
    required: true,
  })
  @Prop({ unique: true })
  @IsString()
  facebookId: string;

  @ApiProperty({
    example: '네이버 아이디',
    description: '소셜 로그인 계정 통합',
    required: true,
  })
  @Prop({ unique: true })
  @IsString()
  naverId: string;

  readonly readonlyData: {
    storeName: string;
    profileURL: string;
  };
}

export const UserSchema = SchemaFactory.createForClass(User);

// virtual field 실제로 DB에 저장되는 필드는 아니지만 비지니스 로직에 사용가능한 필드
UserSchema.virtual('readonlyData').get(function (this: User) {
  return {
    storeName: this.storeName,
    profileURL: this.profileURL,
  };
});
