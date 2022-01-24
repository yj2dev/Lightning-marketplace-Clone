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
    example: 'InputYourName',
    description: 'name',
    required: true,
  })
  @Prop({ required: true })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'example@gmail.com',
    description: 'email',
    required: true,
  })
  @Prop({ required: true, unique: true })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: '5342uL7rxMrWVm6b',
    description: 'password',
    required: true,
  })
  @Prop({ required: true })
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;

  @Prop({ default: 'http://placehold.it/250x250' })
  @IsString()
  profileURL: string;

  readonly readonlyData: { name: string; email: string; profileURL };
}

export const UserSchema = SchemaFactory.createForClass(User);

// virtual field 실제로 DB에 저장되는 필드는 아니지만 비지니스 로직에 사용가능한 필드
UserSchema.virtual('readonlyData').get(function (this: User) {
  return {
    name: this.name,
    email: this.email,
    profileURL: this.profileURL,
  };
});
