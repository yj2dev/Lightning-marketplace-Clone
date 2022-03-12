import { Document, SchemaOptions, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

const options: SchemaOptions = {
  timestamps: true,
  versionKey: false,
};

@Schema(options)
export class ProductContact extends Document {
  @ApiProperty({
    example: '620b828e1f6b15237478a8f9',
    description: '상품문의 게시글이 작성되는 상점 아이디',
    required: true,
  })
  @Prop({ type: Types.ObjectId, ref: 'users' })
  @IsString()
  toStoreId: Types.ObjectId;

  @ApiProperty({
    example: '620afacc4b13710ca520168e',
    description: '상품문의 게시글 작성자',
    required: true,
  })
  @Prop({ type: Types.ObjectId, ref: 'users' })
  @IsString()
  fromWriterId: Types.ObjectId;

  @ApiProperty({
    example: '두번째 사진 잘 안보여요',
    description: '상점문의 게시글 내용',
    required: true,
  })
  @Prop()
  @IsString()
  content: string;
}

export const ProductContactSchema =
  SchemaFactory.createForClass(ProductContact);

ProductContactSchema.virtual('_fromWriterId', {
  ref: 'users',
  localField: 'fromWriterId',
  foreignField: '_id',
});

ProductContactSchema.set('toObject', { virtuals: true });
ProductContactSchema.set('toJSON', { virtuals: true });
