import { User } from '../../user/model/user.model';
declare const UserSigninDto_base: import("@nestjs/common").Type<Pick<User, "phoneNumber" | "password">>;
export declare class UserSigninDto extends UserSigninDto_base {
}
export {};
