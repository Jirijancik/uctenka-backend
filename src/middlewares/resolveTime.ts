import { MiddlewareFn } from "type-graphql";

export const resolveTime: MiddlewareFn = async ({ info }, next) => {
    const start = Date.now();
    await next();
    const resolveTime = Date.now() - start;
    console.log(`Resolver Time Logger: ${info.parentType.name}.${info.fieldName} [${resolveTime} ms]`);
  };



//   const LogAccess: MiddlewareFn<TContext> = ({ context, info }, next) => {
//     const username: string = context.username || "guest";
//     console.log(`Logging access: ${username} -> ${info.parentType.name}.${info.fieldName}`);
//     return next();
//   };


//   export function NumberInterceptor(minValue: number): MiddlewareFn {
//     return async (_, next) => {
//       const result = await next();
//       // hide values below minValue
//       if (typeof result === "number" && result < minValue) {
//         return null;
//       }
//       return result;
//     };
//   }

//   export const ErrorInterceptor: MiddlewareFn<any> = async ({ context, info }, next) => {
//     try {
//       return await next();
//     } catch (err) {
//       // write error to file log
//       fileLog.write(err, context, info);
  
//       // hide errors from db like printing sql query
//       if (someCondition(err)) {
//         throw new Error("Unknown error occurred!");
//       }
  
//       // rethrow the error
//       throw err;
//     }
//   };