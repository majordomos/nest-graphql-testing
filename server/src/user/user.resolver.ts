import { Resolver, Query, Mutation, Args } from "@nestjs/graphql";
import { UserService } from "./user.service";
import { User } from "./user.entity";
import { CreateUserInput } from "./dto/create-user.input";
import { UpdateUserInput } from "./dto/update-user.input";
import { LoggedUserOutput } from "./dto/logged-user.output";
import { LoginUserInput } from "./dto/login-user.input";
import { UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";

@Resolver(() => User)
export class UserResolver {
    constructor(private readonly userService: UserService) { }

    @UseGuards(JwtAuthGuard)
    @Mutation(() => User)
    createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
        return this.userService.create(createUserInput);
    }

    @UseGuards(JwtAuthGuard)
    @Query(() => [User], { name: 'getUsers' })
    findAll() {
        return this.userService.findAll();
    }

    @UseGuards(JwtAuthGuard)
    @Query(() => User, { name: 'getUser' })
    findOne(@Args('_id', { type: () => String }) id: string) {
        return this.userService.findOne(id);
    }

    @UseGuards(JwtAuthGuard)
    @Mutation(() => User)
    updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
        return this.userService.update(updateUserInput._id, updateUserInput);
    }

    @UseGuards(JwtAuthGuard)
    @Mutation(() => User)
    removeUser(@Args('_id', { type: () => String }) id: string) {
        return this.userService.remove(id);
    }

    @Mutation(() => LoggedUserOutput)
    loginUser(@Args('loginUserInput') loginUserInput: LoginUserInput) {
        return this.userService.loginUser(loginUserInput);
    }
}