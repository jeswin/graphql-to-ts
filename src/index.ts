import gql from "graphql-tag";
import exception from "./exception";
import getObjectType from "./typeDefinitions/objectType";
import getEnumType from "./typeDefinitions/enum";
import getInputObjectType from "./typeDefinitions/input";
import getQueryDefintion from "./queryDefinitions/query";

import {
  IGQLDocumentNode,
  ITSTypes,
  ITSQueries,
  IGQLDefinition,
  ITSTypeInfo,
  TSQuerySelection,
  ITSQuerySelectionCompositeField,
  ITSQuerySelectionSimpleField
} from "./types";

export * from "./types";

export function getTypes(schema: string): ITSTypes {
  const gqlDoc: IGQLDocumentNode = gql([schema]);

  return gqlDoc.kind === "Document"
    ? gqlDoc.definitions.reduce(
        (acc: ITSTypes, def: IGQLDefinition, i: number) =>
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

export function getQueries(queries: string, schema: string): ITSQueries {
  const types = getTypes(schema);

  const gqlDoc: IGQLDocumentNode = gql([queries]);

  return gqlDoc.kind === "Document"
    ? gqlDoc.definitions.reduce(
        (acc: ITSQueries, def: IGQLDefinition, i: number) =>
          def.kind === "OperationDefinition"
            ? def.operation === "query"
              ? {
                  ...acc,
                  queries: acc.queries.concat(
                    getQueryDefintion(def, types, i, "query")
                  )
                }
              : def.operation === "mutation"
                ? {
                    ...acc,
                    mutations: acc.mutations.concat(
                      getQueryDefintion(def, types, i, "mutation")
                    )
                  }
                : acc
            : acc,
        { queries: [], mutations: [] }
      )
    : exception("Invalid graphql schema. Try validating first.");
}

export function typeToString(typeInfo: ITSTypeInfo<any>): string {
  return typeInfo.kind === "Scalar"
    ? typeInfo.nullable
      ? `${typeInfo.type} | undefined`
      : typeInfo.type
    : typeInfo.kind === "List"
      ? typeInfo.nullable
        ? typeInfo.type.nullable
          ? `(${typeToString(typeInfo.type)})[] | undefined`
          : `${typeToString(typeInfo.type)}[] | undefined`
        : typeInfo.type.nullable
          ? `(${typeToString(typeInfo.type)})[]`
          : `${typeToString(typeInfo.type)}[]`
      : exception();
}

function isQuerySelection(
  selection: ITSQuerySelectionSimpleField | ITSQuerySelectionCompositeField
): selection is ITSQuerySelectionCompositeField {
  return typeof (selection as any).selections !== "undefined";
}

export function querySelectionsToObject(selections?: TSQuerySelection[]): any {
  return selections
    ? selections.reduce(
        (acc, selection) => (
          (acc[selection.name] = isQuerySelection(selection)
            ? querySelectionsToObject(selection.selections)
            : typeToString(selection.type)),
          acc
        ),
        {} as any
      )
    : {};
}
