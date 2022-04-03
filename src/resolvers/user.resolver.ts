import { Arg, Authorized, createUnionType, Ctx, Mutation, Query, Resolver, UseMiddleware,  } from "type-graphql";
import { resolveTime } from "../middlewares/resolveTime";
import { CreateUserInput, LoginInput, User, UserModel, UserToken } from "../schema/user.schema.ts";
import UserService from "../service/user.service";
import { Context } from "../types/context";

// const UserTokenUnion = createUnionType({
//   name: "UserWithToken", // the name of the GraphQL union
//   types: () => [User, UserToken] as const, // function that returns tuple of object types classes
// });

@Resolver()
export default class UserResolver {
  constructor(private userService: UserService) {
    this.userService = new UserService();
  }

  @Mutation(() => User)
  createUser(@Arg("input") input: CreateUserInput) {
    return this.userService.createUser(input);
  }

  @Mutation(() => User, {nullable: true}) // Returns the user with Cookie
  login(@Arg("input") input: LoginInput, @Ctx() context: Context) {
    return this.userService.login(input, context);
  }

  // @Query(() => User)
  // me(@Ctx() context: Context) {
  //   return context.user;
  // }

  
  @Authorized()
  @UseMiddleware(resolveTime)
  @Query(() => User, {nullable: true})
  me(@Ctx() context: Context) {
    // console.log(context.req.session);
    
    if(!context.req.session!.userId){
      return null
    }
    
    return this.userService.findUser(context.req.session.userId);
  }
}
