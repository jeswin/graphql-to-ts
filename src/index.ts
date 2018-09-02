import prettier = require("prettier");
import gql from "graphql-tag";
import { inspect, isNull, log } from "util";
import exception from "./exception";
import getObjectType from "./typeDefinitions/objectType";
import getEnumType from "./typeDefinitions/enum";
import getInputObjectType from "./typeDefinitions/input";
import {
  IGQLDocument,
  ITSInterfaceDefinition,
  ITSTypes,
  ITSEnumDefinition
} from "./types";

export function getTypes(schema: string): ITSTypes {
  const gqlDoc: IGQLDocument = gql([schema]);

  return gqlDoc.kind === "Document"
    ? gqlDoc.definitions.reduce(
        (acc: ITSTypes, def: any, i: number) =>
          def.kind === "ObjectTypeDefinition" ||
          def.kind === "ObjectTypeExtension"
            ? {
                ...acc,
                interfaces: acc.interfaces.concat(getObjectType(def, i))
              }
            : def.kind === "EnumTypeDefinition"
              ? {
                  ...acc,
                  enums: acc.enums.concat(getEnumType(def, i))
                }
              : def.kind === "InputObjectTypeDefinition"
                ? {
                    ...acc,
                    interfaces: acc.interfaces.concat(
                      getInputObjectType(def, i)
                    )
                  }
                : acc,
        { interfaces: [], enums: [] }
      )
    : exception("Invalid graphql schema. Try validating first.");
}