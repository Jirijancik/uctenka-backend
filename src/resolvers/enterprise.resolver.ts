import { ApolloError } from "apollo-server";
import { Arg, Authorized,  Ctx, Mutation, Query, Resolver, UseMiddleware,  } from "type-graphql";
import { resolveTime } from "../middlewares/resolveTime";
import { CreateEnterpriseInput, EditEnterpriseInput, Enterprise, GetEnterpriseInput } from "../schema/enterprise.schema";
import EnterpriseService from "../service/user.enterprise";
import { Context } from "../types/context";

@Resolver()
export default class EnterpriseResolver {
  constructor(private enterpriseService: EnterpriseService) {
    this.enterpriseService = new EnterpriseService();
  }

  @Authorized()
  @UseMiddleware(resolveTime)
  @Mutation(() => Enterprise)
  createEnterprise(@Arg("input") input: CreateEnterpriseInput, @Ctx() context: Context) {

    const {userId} = context.req.session;

    if (!userId){
      throw new ApolloError("User is not permitted for this operation!");
    }

    return this.enterpriseService.createEnterprise(input, userId );
  }

  @Authorized()
  @UseMiddleware(resolveTime)
  @Mutation(() => Enterprise)
  deleteEnterprise(@Arg("input") input: GetEnterpriseInput) {
    return this.enterpriseService.deleteEnterprise(input);
  }

  @Authorized()
  @UseMiddleware(resolveTime)
  @Mutation(() => Enterprise)
  editEnterprise(@Arg("input",  { nullable: true }) input: EditEnterpriseInput , @Arg("_id") _id: string ) {
    return this.enterpriseService.editEnterprise(input, _id);
  }
  
  @Query(() => [Enterprise])
  enterprises(@Ctx() context: Context) {
    const {userId} = context.req.session;

    if (!userId){
      throw new ApolloError("User is not permitted for this operation!");
    }

    return this.enterpriseService.findEnterprises(userId);
  }

  @Query(() => Enterprise)
  enterprise(@Arg("input") input: GetEnterpriseInput) {
    return this.enterpriseService.findSingleEnterprise(input);
  }
}
