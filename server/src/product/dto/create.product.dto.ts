import { PickType } from '@nestjs/swagger';
import { Product } from '../model/product.model';

export class CreateProductDto extends PickType(Product, [
  'address',
  'deliveryCharge',
  'description',
  'exchange',
  'price',
  'productImgURL',
  'quantity',
  'status',
  'tag',
  'title',
  // 'largeCateogry',
  // 'mediumCategory',
  // 'smallCategory',
] as const) {}
