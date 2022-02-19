import { Document, SchemaOptions, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

const options: SchemaOptions = {
  timestamps: false,
  versionKey: false,
};

@Schema(options)
export class Tag extends Document {
  @ApiProperty({
    example: '#오렌지',
    description: '태그명(중복가능)',
    required: true,
  })
  @Prop({})
  @IsString()
  name: string;

  @ApiProperty({
    example: '620afacc4b13710ca520168e',
    description: '해당 태그를 사용한 상품게시글 아이디',
    required: true,
  })
  @Prop({ type: Types.ObjectId, ref: 'products' })
  @IsString()
  toProductId: Types.ObjectId;
}

export const TagSchema = SchemaFactory.createForClass(Tag);
