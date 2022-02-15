import { PickType } from '@nestjs/swagger';
import { Product } from '../model/product.model';

export class CreateProductDto extends PickType(Product, [
  'address',
  'containDeliveryCharge',
  'description',
  'enableExchange',
  'largeCateogry',
  'mediumCategory',
  'newProduct',
  'price',
  'quantity',
  'smallCategory',
  'tag',
  'title',
] as const) {}
