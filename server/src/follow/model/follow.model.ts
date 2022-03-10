import { Document, SchemaOptions, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

const options: SchemaOptions = {
  timestamps: true,
  versionKey: false,
};

@Schema(options)
export class Follow extends Document {
  @ApiProperty({
    example: '620afacc4b13710ca520168e',
    description: '팔로우 한 사람(팔로우 버튼을 누른사람)',
    required: true,
  })
  @Prop({ type: Types.ObjectId, ref: 'users' })
  @IsString()
  fromUserId: Types.ObjectId;

  @ApiProperty({
    example: '620b828e1f6b15237478a8f9',
    description: '팔로우 대상',
    required: true,
  })
  @Prop({ type: Types.ObjectId, ref: 'users' })
  @IsString()
  toUserId: Types.ObjectId;
}
export const FollowSchema = SchemaFactory.createForClass(Follow);

FollowSchema.set('toObject', { virtuals: true });
FollowSchema.set('toJSON', { virtuals: true });

FollowSchema.virtual('_toUserId', {
  ref: 'users',
  localField: 'toUserId',
  foreignField: '_id',
});

FollowSchema.virtual('_fromUserId', {
  ref: 'users',
  localField: 'fromUserId',
  foreignField: '_id',
});
