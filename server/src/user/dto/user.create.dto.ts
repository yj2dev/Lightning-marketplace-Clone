import { PickType } from '@nestjs/swagger';
import { User } from '../model/user.model';

export class UserCreateDto extends PickType(User, [
  'phoneNumber',
  'password',
  'storeName',
] as const) {}
