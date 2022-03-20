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
export class Member extends Document {
  @ApiProperty({
    example: '4dsaf2k1a',
    description: '방 아이디',
    required: true,
  })
  @Prop({ type: Types.ObjectId, ref: 'rooms' })
  @IsString()
  roomId: Types.ObjectId;

  @ApiProperty({
    example: '598uvsfiom1a',
    description: '유저 아이디',
    required: true,
  })
  @Prop({ type: Types.ObjectId, ref: 'users' })
  @IsString()
  toUserId: Types.ObjectId;
}

export const MemberSchema = SchemaFactory.createForClass(Member);
