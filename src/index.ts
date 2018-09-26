import gql from "graphql-tag";
import exception from "./exception";
import getObjectType from "./typeDefinitions/objectType";
import getEnumType from "./typeDefinitions/enum";
import getInputObjectType from "./typeDefinitions/input";
import getQueryDefintion from "./queryDefinitions/query";
export { default as generateTypes } from "./codegen/generateTypes";
export { default as generateResolvers } from "./codegen/generateResolvers";
export { default as generateQueries } from "./codegen/generateQueries";

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

export function typeToString(
  typeInfo: ITSTypeInfo<any>,
  useUndefined?: boolean
): string {
  const nothingType = useUndefined ? "undefined" : "null";
  return typeInfo.kind === "Scalar"
    ? typeInfo.nullable
      ? `${typeInfo.type} | ${nothingType}`
      : typeInfo.type
    : typeInfo.kind === "List"
      ? typeInfo.nullable
        ? typeInfo.type.nullable
          ? `(${typeToString(typeInfo.type, useUndefined)})[] | ${nothingType}`
          : `${typeToString(typeInfo.type, useUndefined)}[] | ${nothingType}`
        : typeInfo.type.nullable
          ? `(${typeToString(typeInfo.type, useUndefined)})[]`
          : `${typeToString(typeInfo.type, useUndefined)}[]`
      : exception();
}

function isQuerySelection(
  selection: ITSQuerySelectionSimpleField | ITSQuerySelectionCompositeField
): selection is ITSQuerySelectionCompositeField {
  return typeof (selection as any).selections !== "undefined";
}

export function querySelectionsToObject(
  selections?: TSQuerySelection[],
  useUndefined?: boolean
): any {
  return selections
    ? selections.reduce(
        (acc, selection) => (
          (acc[selection.name] = isQuerySelection(selection)
            ? querySelectionsToObject(selection.selections, useUndefined)
            : typeToString(selection.type, useUndefined)),
          acc
        ),
        {} as any
      )
    : {};
}

export function selectionObjectToTypeString(
  selections?: TSQuerySelection[],
  useUndefined?: boolean
): string {
  const obj = querySelectionsToObject(selections, useUndefined);
  return selectionObjectToTypeStringImpl(obj);
}

function selectionObjectToTypeStringImpl(obj: any): string {
  return typeof obj === "object"
    ? `
      {
        ${Object.keys(obj)
          .map(k => `${k}: ${selectionObjectToTypeStringImpl(obj[k])}`)
          .join(",")}
      }
    `.trim()
    : obj;
}
