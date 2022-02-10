import { PickType } from '@nestjs/swagger';
import { User } from '../model/user.model';

export class UserRequestDto extends PickType(User, [
  'name',
  'storeName',
  'phoneNumber',
] as const) {}
