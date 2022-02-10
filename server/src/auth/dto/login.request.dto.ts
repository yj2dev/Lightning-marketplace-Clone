import { PickType } from '@nestjs/swagger';
import { User } from '../../user/model/user.model';

export class LoginRequestDto extends PickType(User, [
  'name',
  'phoneNumber',
] as const) {}
