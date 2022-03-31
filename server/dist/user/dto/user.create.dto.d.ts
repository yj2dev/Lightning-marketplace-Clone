import { User } from '../model/user.model';
declare const UserCreateDto_base: import("@nestjs/common").Type<Pick<User, "phoneNumber" | "password" | "storeName">>;
export declare class UserCreateDto extends UserCreateDto_base {
}
export {};
