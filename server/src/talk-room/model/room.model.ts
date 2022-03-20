import { Document, SchemaOptions, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { UserSchema } from '../../user/model/user.model';

const options: SchemaOptions = {
  timestamps: true,
  versionKey: false,
};

@Schema(options)
export class Room extends Document {
  @ApiProperty({
    example: '620b828e1f6b15237478a8f9',
    description: '상품 고유 아이디',
    // required: true,
  })
  @Prop({ type: Types.ObjectId, ref: 'users' })
  @IsString()
  toProductId: Types.ObjectId;

  @ApiProperty({
    example: '거래 감사합니다',
    description: '채팅 마지막 내용',
    required: true,
  })
  @Prop()
  @IsString()
  lastContent: string;

  @ApiProperty({
    example: 'feforjgm1',
    description: '상품 판매자 아이디',
    required: true,
  })
  @Prop()
  @IsString()
  sellerId: Types.ObjectId;

  @ApiProperty({
    example: 'asopdkg2',
    description: '상품 구매자 아이디',
    required: true,
  })
  @Prop()
  @IsString()
  buyerId: Types.ObjectId;
}

export const RoomSchema = SchemaFactory.createForClass(Room);

RoomSchema.virtual('_sellerId', {
  ref: 'users',
  localField: 'sellerId',
  foreignField: '_id',
});

RoomSchema.virtual('_buyerId', {
  ref: 'users',
  localField: 'buyerId',
  foreignField: '_id',
});

RoomSchema.set('toObject', { virtuals: true });
RoomSchema.set('toJSON', { virtuals: true });
