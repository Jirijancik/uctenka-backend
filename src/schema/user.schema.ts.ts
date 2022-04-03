import {
  getModelForClass,
  index,
  pre,
  prop,
  queryMethod,
  ReturnModelType,
} from "@typegoose/typegoose";
import { AsQueryMethod } from "@typegoose/typegoose/lib/types";
import bcrypt from "bcrypt";
import { IsEmail, Length, MaxLength, MinLength } from "class-validator";
import { Field, InputType, ObjectType } from "type-graphql";

function findByEmail(
  this: ReturnModelType<typeof User, QueryHelpers>,
  email: User["email"]
) {
  return this.findOne({ email });
}

interface QueryHelpers {
  findByEmail: AsQueryMethod<typeof findByEmail>;
}

@index({ email: 1 })
@queryMethod(findByEmail)
@pre<User>("save", async function () {
  //Check if password is modified
  if (!this.isModified("password")) {
    return;
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hashSync(this.password, salt);

  this.password = hash;
})
@ObjectType()
export class User {
  @Field(() => String)
  _id: string;

  @Field(() => String)
  @prop({ required: true })
  firstName: string;

  @Field(() => String)
  @prop({ required: true })
  lastName: string;

  @Field(() => String)
  @prop({ required: true, unique: true })
  email: string;

  @Field(() => [String])
  businesses?: string[];

  @Field(() => [String])
  businessPartners?: string[];

  @prop({ required: true })
  password: string;

  @prop({ default: false })
  confirmed: boolean;
}

export const UserModel = getModelForClass<typeof User, QueryHelpers>(User);

@InputType()
export class CreateUserInput {
  @Length(1,255)
  @Field(() => String)
  firstName: string;

  @Length(1,255)
  @Field(() => String)
  lastName: string;

  @IsEmail()
  @Field(() => String)
  email: string;

  @MinLength(4, {
    message: "Password must be at least 4 characters long!",
  })
  @MaxLength(50, {
    message: "Password mustnot be longer than 50 characters!",
  })
  @Field(() => String)
  password: string;
}

@InputType()
export class LoginInput {
  @IsEmail()
  @Field(() => String)
  email: string;

  @Field(() => String)
  password: string;
}

@ObjectType()
export class UserToken   {
  @Field(() => String)
  token: string;
}