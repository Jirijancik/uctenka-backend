import { getModelForClass, index, prop, Ref } from "@typegoose/typegoose";
import { Field, InputType, ObjectType } from "type-graphql";
import { customAlphabet } from "nanoid";
import { IsEmail, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, Length, MaxLength, Min, MinLength } from "class-validator";
import { BusinessType } from "../types/businessType";
import { Currency } from "../types/currency";
import { PaymentMethod } from "../types/paymentMethod";
import { PaymentTerms } from "../types/paymentTerms";
import { User } from "./user.schema.ts";

const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyz123456789", 10);

@ObjectType()
@index({ user: 1 })
export class Enterprise {
  @Field(() => String)
  _id: string;

  @Field(() => Number)
  @prop({ required: true })
  accountBalance: number;

  @Field(() => Number)
  @prop({ required: true })
  accountNumber: number;

  @Field(() => String)
  @prop({ required: true })
  bussinessType: BusinessType;

  @Field(() => String)
  @prop({ required: true })
  city: string;

  @Field(() => String)
  @prop({ required: false })
  contactPerson: string;

  @Field(() => String)
  @prop({ required: true })
  country: string;

  @Field(() => String)
  @prop({ required: true })
  currency: Currency;

  @Field(() => String)
  @prop({ required: true })
  email: string;

  @Field(() => Number)
  @prop({ required: true })
  mobilePhone: number;

  @Field(() => String)
  @prop({ required: true })
  name: string;

  @Field(() => String)
  @prop({ required: false })
  paymentMethod: PaymentMethod;

  @Field(() => String)
  @prop({ required: false })
  paymentTerms: PaymentTerms;

  @Field(() => Number)
  @prop({ required: true })
  postcode: number;

  @Field(() => String)
  @prop({ required: true })
  street: string;

  @Field(() => Number)
  @prop({ required: true })
  unifiedVatNumber: number;

  @Field(() => String)
  @prop({ required: true, ref: () => User })
  user: Ref<User>;

  @Field(() => Number)
  @prop({ required: false })
  vatNumber: number;
}

export const EnterpriseModel = getModelForClass<typeof Enterprise>(Enterprise);

@InputType()
export class CreateEnterpriseInput {
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @Field(() => Number)
  accountNumber: number;

  @IsNotEmpty()
  @IsEnum(BusinessType)
  @Field(() => String)
  bussinessType: BusinessType;

  @IsNotEmpty()
  @IsString()
  @Length(1, 150)
  @Field(() => String)
  city: string;

  @IsOptional()
  @IsString()
  @Length(1, 150)
  @Field(() => String)
  contactPerson: string;

  @IsNotEmpty()
  @IsString()
  @Length(1, 150)
  @Field(() => String)
  country: string;

  @IsNotEmpty()
  @IsEnum(Currency)
  @Field(() => String)
  currency: Currency;

  @IsNotEmpty()
  @IsEmail()
  @Field(() => String)
  email: string;

  @IsNotEmpty()
  @IsNumber()
  @Field(() => Number)
  mobilePhone: number;

  @IsNotEmpty()
  @IsString()
  @Length(1, 150)
  @Field(() => String)
  name: string;

  @IsOptional()
  @IsEnum(PaymentMethod)
  @Field(() => String)
  paymentMethod: PaymentMethod;

  @IsOptional()
  @IsEnum(PaymentTerms)
  @Field(() => String)
  paymentTerms: PaymentTerms;

  @IsNotEmpty()
  @IsNumber()
  @Field(() => Number)
  postcode: number;

  @IsNotEmpty()
  @IsString()
  @Length(1, 150)
  @Field(() => String)
  street: string;

  @IsNotEmpty()
  @IsNumber()
  @Field(() => Number)
  unifiedVatNumber: number;

  @IsOptional()
  @IsNumber()
  @Field(() => Number)
  vatNumber: number;
}


@InputType()
export class EditEnterpriseInput {
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @Field(() => Number, { nullable: true })
  accountNumber: number;

  @IsNotEmpty()
  @IsEnum(BusinessType)
  @Field(() => String, { nullable: true })
  bussinessType: BusinessType;

  @IsNotEmpty()
  @IsString()
  @Length(1, 150)
  @Field(() => String, { nullable: true })
  city: string;

  @IsOptional()
  @IsString()
  @Length(1, 150)
  @Field(() => String, { nullable: true })
  contactPerson: string;

  @IsNotEmpty()
  @IsString()
  @Length(1, 150)
  @Field(() => String, { nullable: true })
  country: string;

  @IsNotEmpty()
  @IsEnum(Currency)
  @Field(() => String, { nullable: true })
  currency: Currency;

  @IsNotEmpty()
  @IsEmail()
  @Field(() => String, { nullable: true })
  email: string;

  @IsNotEmpty()
  @IsNumber()
  @Field(() => Number, { nullable: true })
  mobilePhone: number;

  @IsNotEmpty()
  @IsString()
  @Length(1, 150)
  @Field(() => String, { nullable: true })
  name: string;

  @IsOptional()
  @IsEnum(PaymentMethod)
  @Field(() => String, { nullable: true })
  paymentMethod: PaymentMethod;

  @IsOptional()
  @IsEnum(PaymentTerms)
  @Field(() => String, { nullable: true })
  paymentTerms: PaymentTerms;

  @IsNotEmpty()
  @IsNumber()
  @Field(() => Number, { nullable: true })
  postcode: number;

  @IsNotEmpty()
  @IsString()
  @Length(1, 150)
  @Field(() => String, { nullable: true })
  street: string;

  @IsNotEmpty()
  @IsNumber()
  @Field(() => Number, { nullable: true })
  unifiedVatNumber: number;

  @IsOptional()
  @IsNumber()
  @Field(() => Number, { nullable: true })
  vatNumber: number;
}

@InputType()
export class GetEnterpriseInput {
  @IsNotEmpty()
  @Field(() => String)
  _id: string;
}


