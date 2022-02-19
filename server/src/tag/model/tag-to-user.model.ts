import { Document, SchemaOptions, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

const options: SchemaOptions = {
  timestamps: true,
  versionKey: false,
};

@Schema(options)
export class TagToUser extends Document {
  @ApiProperty({
    example: '620b828e1f6b15237478a8f9',
    description: '태그 아이디',
    required: true,
  })
  @Prop({ type: Types.ObjectId, ref: 'users' })
  @IsString()
  tagId: string;

  @ApiProperty({
    example: '620afacc4b13710ca520168e',
    description: '유저(상점) 아이디',
    required: true,
  })
  @Prop({ type: Types.ObjectId, ref: 'users' })
  @IsString()
  userId: Types.ObjectId;
}

export const TagToUserSchema = SchemaFactory.createForClass(TagToUser);
