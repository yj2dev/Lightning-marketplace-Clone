import { Document, SchemaOptions, Types } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsString } from 'class-validator';

const options: SchemaOptions = {
  timestamps: true,
  versionKey: false,
};

@Schema(options)
export class ProductImage extends Document {
  @ApiProperty({
    example: '상품 아이디',
    description: '이미지가 등록된 상품 아이디',
    required: true,
  })
  @Prop({ type: Types.ObjectId, ref: 'products' })
  @IsString()
  productId: Types.ObjectId;

  @ApiProperty({
    example: '상품 이미지 경로',
    description: '상품에 등록된 이미지 경로',
    required: true,
  })
  @Prop()
  @IsString()
  productImgURL: string;
}

export const ProductImageSchema = SchemaFactory.createForClass(ProductImage);
