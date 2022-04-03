import { ApolloError } from "apollo-server";
import { Arg, Authorized,  Ctx, Mutation, Query, Resolver, UseMiddleware,  } from "type-graphql";
import { resolveTime } from "../middlewares/resolveTime";
import { CreateEnterpriseInput, Enterprise, GetEnterpriseInput } from "../schema/enterprise.schema";
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
  
  @Query(() => [Enterprise])
  enterprises() {
    return this.enterpriseService.findEnterprises();
  }

  @Query(() => Enterprise)
  enterprise(@Arg("input") input: GetEnterpriseInput) {
    return this.enterpriseService.findSingleEnterprise(input);
  }
}
