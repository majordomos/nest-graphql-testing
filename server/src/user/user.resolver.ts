import { Resolver, Query, Mutation, Args } from "@nestjs/graphql";
import { UserService } from "./user.service";
import { User } from "./user.entity";
import { CreateUserInput } from "./dto/create-user.input";
import { UpdateUserInput } from "./dto/update-user.input";
import { LoggedUserOutput } from "./dto/logged-user.output";
import { LoginUserInput } from "./dto/login-user.input";
// import { UseGuards } from "@nestjs/common";
// import { GqlAuthGuard } from "src/auth/custom.guard";

@Resolver(() => User)
export class UserResolver {
    constructor(private readonly userService: UserService) { }

    @Mutation(() => User)
    createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
        return this.userService.create(createUserInput);
    }

    @Query(() => [User], { name: 'getUsers' })
    findAll() {
        return this.userService.findAll();
    }

    @Query(() => User, { name: 'getUser' })
    findOne(@Args('_id', { type: () => String }) id: string) {
        return this.userService.findOne(id);
    }

    @Mutation(() => User)
    // @UseGuards(GqlAuthGuard)
    updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
        return this.userService.update(updateUserInput._id, updateUserInput);
    }

    @Mutation(() => User)
    removeUser(@Args('_id', { type: () => String }) id: string) {
        return this.userService.remove(id);
    }

    @Mutation(() => LoggedUserOutput)
    loginUser(@Args('loginUserInput') loginUserInput: LoginUserInput) {
        return this.userService.loginUser(loginUserInput);
    }
}