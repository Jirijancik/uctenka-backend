import { CreateEnterpriseInput, EnterpriseModel, GetEnterpriseInput } from "../schema/enterprise.schema";
import { User } from "../schema/user.schema.ts";


class EnterpriseService {
  async createEnterprise(input: CreateEnterpriseInput, userId: User["_id"]) {
    const newAccountBallance = 0;
    return EnterpriseModel.create({...input, user: userId, accountBalance: newAccountBallance});
  }

  async findSingleEnterprise(input: GetEnterpriseInput) {
    return EnterpriseModel.findOne(input).lean();
  }

  async findEnterprises() {
    // Pagination login
    return EnterpriseModel.find().lean();
  }

  async deleteEnterprise(id: GetEnterpriseInput) {
    // Pagination login
    return EnterpriseModel.findByIdAndDelete(id);
  }

}

export default EnterpriseService;
