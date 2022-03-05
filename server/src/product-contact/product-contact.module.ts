import { Module } from '@nestjs/common';
import { ProductContactController } from './product-contact.controller';
import { ProductContactService } from './product-contact.service';

@Module({
  controllers: [ProductContactController],
  providers: [ProductContactService]
})
export class ProductContactModule {}
