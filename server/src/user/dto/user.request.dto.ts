import { PickType } from '@nestjs/swagger';
import { User } from '../model/user.model';

export class UserRequestDto extends PickType(User, [
  'name',
  'email',
  'password',
] as const) {}
