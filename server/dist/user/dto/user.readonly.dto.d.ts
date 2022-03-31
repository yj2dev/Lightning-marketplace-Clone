import { User } from '../model/user.model';
declare const UserReadonlyDto_base: import("@nestjs/common").Type<Pick<User, "storeName">>;
export declare class UserReadonlyDto extends UserReadonlyDto_base {
    _id: string;
}
export {};
