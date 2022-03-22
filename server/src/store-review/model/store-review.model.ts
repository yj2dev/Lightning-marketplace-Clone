import { Document, SchemaOptions, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { StoreContactSchema } from '../../store-contact/model/store-contact.model';

const options: SchemaOptions = {
  timestamps: true,
  versionKey: false,
};

@Schema(options)
export class StoreReview extends Document {
  @ApiProperty({
    example: '620b828e1f6b15237478a8f9',
    description: '상점후기 게시글이 작성되는 상점 아이디',
    required: true,
  })
  @Prop({ type: Types.ObjectId, ref: 'users' })
  @IsString()
  toStoreId: Types.ObjectId;

  @ApiProperty({
    example: '620afacc4b13710ca520168e',
    description: '상점후기 게시글 작성자',
    required: true,
  })
  @Prop({ type: Types.ObjectId, ref: 'users' })
  @IsString()
  fromWriterId: Types.ObjectId;

  @ApiProperty({
    example: '너무 친절하셔서 화상 입을 뻔했습니다.',
    description: '상점후기 게시글 내용',
    required: true,
  })
  @Prop()
  @IsString()
  content: string;
}

export const StoreReviewSchema = SchemaFactory.createForClass(StoreReview);

StoreReviewSchema.virtual('_fromWriterId', {
  ref: 'users',
  localField: 'fromWriterId',
  foreignField: '_id',
});

StoreReviewSchema.set('toObject', { virtuals: true });
StoreReviewSchema.set('toJSON', { virtuals: true });
