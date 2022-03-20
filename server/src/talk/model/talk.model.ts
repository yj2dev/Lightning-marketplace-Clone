import { Document, SchemaOptions, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

const options: SchemaOptions = {
  timestamps: true,
  versionKey: false,
  id: false,
};

@Schema(options)
export class Talk extends Document {
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
