import { Document, SchemaOptions, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { ProductSchema } from '../../product/model/product.model';
import { UserSchema } from '../../user/model/user.model';

const options: SchemaOptions = {
  timestamps: true,
  versionKey: false,
};

@Schema(options)
export class ProductFavorite extends Document {
  @ApiProperty({
    example: '620b828e1f6b15237478a8f9',
    description: '상품을 찜한 상점(유저) 아이디',
    required: true,
  })
  @Prop({ type: Types.ObjectId, ref: 'users' })
  @IsString()
  toStoreId: Types.ObjectId;

  @ApiProperty({
    example: '620afacc4b13710ca520168e',
    description: '찜한 상품 아이디',
    required: true,
  })
  @Prop({ type: Types.ObjectId, ref: 'products' })
  @IsString()
  fromProductId: Types.ObjectId;
}

export const ProductFavoriteSchema =
  SchemaFactory.createForClass(ProductFavorite);

ProductFavoriteSchema.set('toObject', { virtuals: true });
ProductFavoriteSchema.set('toJSON', { virtuals: true });

ProductFavoriteSchema.virtual('_fromProductId', {
  ref: 'products',
  localField: 'fromProductId',
  foreignField: '_id',
});
