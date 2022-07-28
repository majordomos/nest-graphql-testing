import { Injectable, forwardRef, Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(@Inject(forwardRef(() => UserService))
    private userService: UserService,
        private jwtTokenService: JwtService
    ) { }

    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.userService.findOneByEmail(email);
        if (!user) {
            return null;
        }
        if (await bcrypt.compare(password, user.password)) {
            delete user.password;
            return user;
        }
    }

    async generateUserCredentials(user: User) {
        const payload = {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            role: user.role,
            sub: user._id,
        };

        return {
            access_token: this.jwtTokenService.sign(payload),
        };
    }
}
