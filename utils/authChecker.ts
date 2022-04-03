import { AuthChecker } from "type-graphql";
import { Context } from "../src/types/context";

export const authChecker: AuthChecker<Context> =  ({context}) => !!context.req.session.userId