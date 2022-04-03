import EnterpriseResolver from "./enterprise.resolver";
import UserResolver from "./user.resolver";

export const resolvers = [UserResolver, EnterpriseResolver] as const;
