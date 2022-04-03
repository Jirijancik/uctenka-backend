import { ApolloError } from "apollo-server-errors";
import bcrypt from "bcrypt";
import { signJwt } from "../../utils/jwt";
import {
  CreateUserInput,
  LoginInput,
  UserModel,
} from "../schema/user.schema.ts";
import { Context } from "../types/context";

class UserService {
  async createUser(input: CreateUserInput) {



    
    return UserModel.create(input);
  }

  async findUser(userId: string) {
    return UserModel.findById(userId);
  }

  async login(input: LoginInput, context: Context) {
    const e = "Invalid email or password";

    // Get our user by email
    const user = await UserModel.find().findByEmail(input.email).lean();

    if (!user) {
      throw new ApolloError(e);
    }

    // validate the password
    const passwordIsValid = await bcrypt.compare(input.password, user.password);

    if (!passwordIsValid) {
      throw new ApolloError(e);
    }

    if (!user.confirmed) {
      throw new ApolloError("Please confirm your email befor logging in!");
    }

    // sign a jwt
    // const token = signJwt(user);
  
    // set a cookie for the jwt
    // context.res.cookie("accessToken", token, {
    //   maxAge: 3.154e10, // 1 year
    //   httpOnly: true,
    //   domain: "localhost",
    //   path: "/",
    //   sameSite: "strict",
    //   secure: false,
    // });

    //context.req.session.token = token
    context.req.session.userId = user._id
    
    // return the jwt
    return user;
  }
}

export default UserService;
