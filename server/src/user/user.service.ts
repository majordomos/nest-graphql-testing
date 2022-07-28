import { BadRequestException, Injectable, NotFoundException, UseGuards } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './user.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuthService } from '../auth/auth.service';
import { LoginUserInput } from './dto/login-user.input';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name)
        private readonly userModel: Model<User>,
        private readonly authService: AuthService,
    ) { }

    create(createUserInput: CreateUserInput) {
        const user = new this.userModel(createUserInput);
        return user.save();
    }

    findAll() {
        return this.userModel.find().exec();
    }

    async findOne(id: string) {
        const user = await this.userModel.findOne({ _id: id }).exec();
        if (!user) {
            throw new NotFoundException(` User ${id} not found`);
        }
        return user;
    }

    async findOneByEmail(email: string) {
        const user = await this.userModel.findOne({ email: email }).exec();
        if (!user) {
            throw new NotFoundException(`User with email ${email} not found`);
        }
        return user;
    }

    async update(id: string, updateUserInput: UpdateUserInput) {
        const existingUser = await this.userModel.findOneAndUpdate({ _id: id }, { $set: updateUserInput }, { new: true }).exec();

        if (!existingUser) {
            throw new NotFoundException(`User ${id} not found`);
        }
        return existingUser;
    }

    async remove(id: string) {
        const user = await this.findOne(id);
        return user.remove();
    }

    async loginUser(loginUserInput: LoginUserInput) {
        const user = await this.authService.validateUser(
            loginUserInput.email,
            loginUserInput.password,
        );
        if (!user) {
            throw new BadRequestException(`Email or password are invalid`);
        } else {
            return this.authService.generateUserCredentials(user);
        }
    }
}
