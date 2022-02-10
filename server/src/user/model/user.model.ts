import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaOptions } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

const options: SchemaOptions = {
  timestamps: true,
  versionKey: false,
};

@Schema(options)
export class User extends Document {
  @ApiProperty({
    example: '장벼락',
    description: '유저가 가입시 입력한 이름',
    required: true,
  })
  @Prop({ required: true })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: '상점1004호',
    description: '상점명',
    required: true,
  })
  @Prop({ required: true, unique: true })
  @IsString()
  @IsNotEmpty()
  storeName: string;

  @Prop({ default: 'http://placehold.it/250x250' })
  @IsString()
  profileURL: string;

  @ApiProperty({
    example: '010-1234-5678',
    description: '유저가 가입시 인증한 전화번호',
    required: true,
  })
  @Prop({ required: true })
  @IsString()
  @IsNotEmpty()
  phoneNumber: string;

  readonly readonlyData: {
    name: string;
    storeName: string;
    profileURL: string;
  };
}

export const UserSchema = SchemaFactory.createForClass(User);

// virtual field 실제로 DB에 저장되는 필드는 아니지만 비지니스 로직에 사용가능한 필드
UserSchema.virtual('readonlyData').get(function (this: User) {
  return {
    name: this.name,
    storeName: this.storeName,
    profileURL: this.profileURL,
  };
});
