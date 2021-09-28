// import { defaultFieldResolver } from 'graphql';

// import { ApolloError } from 'apollo-server-express';
// import { SchemaDirectiveVisitor } from '@graphql-tools/schema';

// export class IsAuthDirective extends SchemaDirectiveVisitor {
//   visitFieldDefinition(field) {
//     const { resolve = defaultFieldResolver } = field;

//     field.resolve = async function (...args) {
//       let [_, {}, { user, isAuth }] = args;
//       if (isAuth) {
//         const result = await resolve.apply(this, args);
//         return result;
//       } else {
//         throw new ApolloError(
//           'You must be the authenticated user to get this information'
//         );
//       }
//     };
//   }
// }
