import { Document, SchemaOptions, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { User } from '../../user/model/user.model';

const options: SchemaOptions = {
  timestamps: true,
  versionKey: false,
};

@Schema(options)
export class Product extends Document {
  @Prop({ type: Types.ObjectId, required: true, ref: 'users' })
  @IsString()
  @IsNotEmpty()
  seller: User;

  @Prop({ required: true })
  @IsString()
  @IsNotEmpty()
  productImgURL: string;

  @Prop({ required: true })
  @IsString()
  @IsNotEmpty()
  title: string;

  @Prop({ required: true })
  @IsString()
  @IsNotEmpty()
  category: string;

  @Prop({ required: true })
  @IsString()
  @IsNotEmpty()
  transactionRegion: string;

  @Prop({ required: true })
  @IsString()
  @IsNotEmpty()
  status: string;

  @Prop({ required: true })
  @IsString()
  @IsNotEmpty()
  exchange: string;

  @Prop({ required: true })
  @IsNumber()
  @IsNotEmpty()
  price: number;

  @Prop({ required: true, default: false })
  @IsBoolean()
  @IsNotEmpty()
  deliveryCharge: boolean;

  @Prop({ required: true, minlength: 10, maxlength: 2000 })
  @IsString()
  @IsNotEmpty()
  description: string;

  @Prop({ required: true })
  @IsString()
  @IsNotEmpty()
  address: string;

  @Prop({})
  @IsString()
  @IsNotEmpty()
  tag: string;

  @Prop({})
  @IsNumber()
  @IsNotEmpty()
  quantity: number;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
