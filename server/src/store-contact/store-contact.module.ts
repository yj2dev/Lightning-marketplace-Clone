import { Module } from '@nestjs/common';
import { StoreContactController } from './store-contact.controller';

@Module({
  controllers: [StoreContactController]
})
export class StoreContactModule {}
