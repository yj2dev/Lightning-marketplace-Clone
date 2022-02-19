import { Module } from '@nestjs/common';
import { SmsController } from './sms.controller';
import { SmsService } from './sms.service';
import { UserRepository } from '../store/repository/user.repository';
import { UserModule } from '../store/user.module';

@Module({
  imports: [UserModule],
  controllers: [SmsController],
  providers: [SmsService],
})
export class SmsModule {}
