import gql from "graphql-tag";
import exception from "./exception";
import getObjectType from "./typeDefinitions/objectType";
import getEnumType from "./typeDefinitions/enum";
import getInputObjectType from "./typeDefinitions/input";
import getQueryDefintion from "./queryDefinitions/query";

import {
  IGQLDocument,
  ITSTypes,
  ITSQueryTypes,
  ITSQueryDefinition
} from "./types";
import { inspect } from "util";

export * from "./types";

export function getTypes(schema: string): ITSTypes {
  const gqlDoc: IGQLDocument = gql([schema]);

  return gqlDoc.kind === "Document"
    ? gqlDoc.definitions.reduce(
        (acc: ITSTypes, def: any, i: number) =>
          def.kind === "ObjectTypeDefinition" ||
          def.kind === "ObjectTypeExtension"
            ? {
                ...acc,
                interfaces: acc.interfaces.concat(getObjectType(def, i, acc))
              }
            : def.kind === "EnumTypeDefinition"
              ? {
                  ...acc,
                  enums: acc.enums.concat(getEnumType(def, i, acc))
                }
              : def.kind === "InputObjectTypeDefinition"
                ? {
                    ...acc,
                    interfaces: acc.interfaces.concat(
                      getInputObjectType(def, i, acc)
                    )
                  }
                : acc,
        { interfaces: [], enums: [] }
      )
    : exception("Invalid graphql schema. Try validating first.");
}

export function getQueries(queries: string, schema: string): ITSQueryTypes {
  const gqlDoc: IGQLDocument = gql([queries]);

  return gqlDoc.kind === "Document"
    ? gqlDoc.definitions.reduce(
        (acc: ITSQueryTypes, def: any, i: number) =>
          def.kind === "OperationDefinition"
            ? def.operation === "query"
              ? {
                  ...acc,
                  queries: acc.queries.concat(getQueryDefintion(def, schema))
                }
              : def.operation === "mutation"
                ? {
                    ...acc,
                    mutations: acc.mutations.concat(
                      getQueryDefintion(def, schema)
                    )
                  }
                : acc
            : acc,
        { queries: [], mutations: [] }
      )
    : exception("Invalid graphql schema. Try validating first.");
}
