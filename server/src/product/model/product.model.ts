import { Document, SchemaOptions, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

const options: SchemaOptions = {
  timestamps: true,
  versionKey: false,
};

@Schema(options)
export class Product extends Document {
  @ApiProperty({
    example: 'new ObjectId("62081b8ef29f8da07a084ad1")',
    description: '상품을 등록한 유저 아이디(상점 아이디)',
    required: true,
  })
  @Prop({ type: Types.ObjectId, required: true, ref: 'users' })
  @IsString()
  @IsNotEmpty()
  userId: Types.ObjectId;

  @ApiProperty({
    example: 'https://localhost:8000/static/product_image/product4431232.png',
    description: '상품 썸네일(대표) 이미지 경로',
    required: true,
  })
  @Prop({})
  @IsString()
  @IsNotEmpty()
  thumbnailImgURL: string;

  @ApiProperty({
    example:
      'https://localhost:8000/static/product_image/product2319408132.png',
    description: '상품 이미지 경로',
    required: true,
  })
  @Prop({ type: Types.ObjectId, ref: 'productimages' })
  @IsString()
  @IsNotEmpty()
  productImgURL: Types.ObjectId;

  @ApiProperty({
    example: 'false',
    description: '상품명 / 길이제한(2~40)',
    required: true,
  })
  @Prop({ required: true, minlength: 2, maxlength: 40 })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    example: 'false',
    description: 'false(기본값): 중고상품 / true: 신상품',
    required: true,
  })
  @Prop({ required: true, default: false })
  @IsBoolean()
  @IsNotEmpty()
  newProduct: boolean;

  @ApiProperty({
    example: 'false',
    description: 'false(기본값): 교환불가 / true: 교환가능',
    required: true,
  })
  @Prop({ required: true, default: false })
  @IsBoolean()
  @IsNotEmpty()
  enableExchange: boolean;

  @ApiProperty({
    example: '50000',
    description: '상품가격',
    required: true,
  })
  @Prop({ required: true })
  @IsNumber()
  @IsNotEmpty()
  price: number;

  @ApiProperty({
    example: 'false',
    description: 'false(기본값): 배송비 미포함 / true: 배송비 포함',
    required: true,
  })
  @Prop({ required: true, default: false })
  @IsBoolean()
  @IsNotEmpty()
  containDeliveryCharge: boolean;

  @ApiProperty({
    example: '상품설명',
    description: '상품설명 / 길이제한(10~2000)',
    required: true,
  })
  @Prop({ required: true, minlength: 10, maxlength: 2000 })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    example: '상품',
    description: '상품설명 / 길이제한(10~2000)',
    required: true,
  })
  @Prop({ required: true })
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiProperty({
    example: '[#벼락1, #벼락2, #벼락3, #벼락4, #벼락5]',
    description: '상품태그 / 개수제한(0~5)',
    required: false,
  })
  @Prop({ type: Types.ObjectId, ref: 'hashtags' })
  @IsString()
  @IsNotEmpty()
  tag: Types.ObjectId;

  @ApiProperty({
    example: '1',
    description: '상품설명 / 1(기본값)',
    required: true,
  })
  @Prop({ required: true, default: 1 })
  @IsNumber()
  @IsNotEmpty()
  quantity: number;

  @Prop({})
  @IsString()
  @IsNotEmpty()
  largeCateogry: string;

  @Prop({})
  @IsString()
  mediumCategory: string;

  @Prop({})
  @IsString()
  smallCategory: string;
}

const _ProductSchema = SchemaFactory.createForClass(Product);

_ProductSchema.virtual('productimages', {
  ref: 'productimages',
  localField: '_id',
  foreignField: 'productId',
});

_ProductSchema.set('toObject', { virtuals: true });
_ProductSchema.set('toJSON', { virtuals: true });

export const ProductSchema = _ProductSchema;
