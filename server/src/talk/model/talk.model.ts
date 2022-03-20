import { Document, SchemaOptions, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { RoomSchema } from '../../talk-room/model/room.model';

const options: SchemaOptions = {
  timestamps: true,
  versionKey: false,
  id: false,
};

@Schema(options)
export class Talk extends Document {
  @ApiProperty({
    example: '6236f8ae9f21683878768c72',
    description: '포함되어 있는 방 아이디',
    required: true,
  })
  @Prop({ type: Types.ObjectId, ref: 'rooms' })
  @IsString()
  roomId: Types.ObjectId;

  @ApiProperty({
    example: '620b828e1f6b15237478a8f9',
    description: '채팅 작성자(본인)',
    required: true,
  })
  @Prop({ type: Types.ObjectId, ref: 'users' })
  @IsString()
  toUserId: Types.ObjectId;

  @ApiProperty({
    example: '620afacc4b13710ca520168e',
    description: '채팅 대상(받는 사람)',
    required: true,
  })
  @Prop({ type: Types.ObjectId, ref: 'users' })
  @IsString()
  fromUserId: Types.ObjectId;

  @ApiProperty({
    example: '안녕하세요. 상품에 관심 있어서 연락드립니다.',
    description: '채팅 내용',
    required: true,
  })
  @Prop()
  @IsString()
  content: string;

  @ApiProperty({
    example: 'true',
    description: '메시지 읽은 여부',
  })
  @Prop({ default: true })
  notRead: boolean;
}

export const TalkSchema = SchemaFactory.createForClass(Talk);

TalkSchema.virtual('_toUserId', {
  ref: 'users',
  localField: 'toUserId',
  foreignField: '_id',
});

TalkSchema.virtual('_fromUserId', {
  ref: 'users',
  localField: 'fromUserId',
  foreignField: '_id',
});

TalkSchema.set('toObject', { virtuals: true });
TalkSchema.set('toJSON', { virtuals: true });
