import { Payload } from './jwt.payload';
import { UserRepository } from '../../user/repository/user.repository';
declare const JwtStrategy_base: new (...args: any[]) => any;
export declare class JwtStrategy extends JwtStrategy_base {
    private readonly userRepository;
    constructor(userRepository: UserRepository);
    validate(payload: Payload): Promise<import("../../user/model/user.model").User>;
}
export {};
