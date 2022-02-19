import { PickType } from '@nestjs/swagger';
import { User } from '../../store/model/user.model';

export class UserSigninDto extends PickType(User, [
  'phoneNumber',
  'password',
] as const) {}
