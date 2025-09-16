import { GraphQLSchema } from 'graphql';
import { getDirective, MapperKind, mapSchema } from '@graphql-tools/utils';
import AppError from '@/error/AppError';

function isAuthDirective(directiveName: string) {
  return {
    isAuthDirectiveTypeDefs: `directive @${directiveName} on FIELD_DEFINITION`,
    isAuthDirectiveTransformer: (schema: GraphQLSchema) =>
      mapSchema(schema, {
        [MapperKind.OBJECT_FIELD](fieldConfig) {
          const isAuthDirective = getDirective(schema, fieldConfig, directiveName)?.[0];
          if (isAuthDirective) {
            const { resolve = fieldConfig.resolve } = fieldConfig;
            fieldConfig.resolve = async function (source, args, context, info) {
              if (!context.userId) {
                throw new AppError('Not authenticated.');
              }
              return resolve ? resolve.call(this, source, args, context, info) : undefined;
            };
            return fieldConfig;
          }
        },
      }),
  };
}

export default isAuthDirective;
