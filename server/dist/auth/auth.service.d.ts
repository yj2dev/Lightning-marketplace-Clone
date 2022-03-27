import { UserRepository } from '../user/repository/user.repository';
import { UserSigninDto } from './dto/user.signin.dto';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private readonly userRepository;
    private jwtService;
    constructor(userRepository: UserRepository, jwtService: JwtService);
    jwtCheckAccount(userId: string, currentPassword: string, password: string): Promise<boolean>;
    jwtSignin(userSigninDto: UserSigninDto): Promise<{
        jwt: string;
        user: import("../user/model/user.model").User;
    }>;
}
