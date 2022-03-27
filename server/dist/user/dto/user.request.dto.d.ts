import { User } from '../model/user.model';
declare const UserRequestDto_base: import("@nestjs/common").Type<Pick<User, "phoneNumber" | "password">>;
export declare class UserRequestDto extends UserRequestDto_base {
}
export {};
