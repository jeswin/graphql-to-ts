import prettier = require("prettier");
import gql from "graphql-tag";
import { inspect, isNull } from "util";
import exception from "./exception";
import { generateObjectType } from "./typeDefinitions/objectType";
import { generateEnumType } from "./typeDefinitions/enum";
import { generateInputObjectType } from "./typeDefinitions/input";
import { IGQLDocument } from "./types";

export function generateTypes(schema: string): any {
  const gqlDoc: IGQLDocument = gql([schema]);

  return gqlDoc.kind === "Document"
    ? prettier.format(
        gqlDoc.definitions.reduce(
          (acc: string, def: any) =>
            acc +
            (def.kind === "ObjectTypeDefinition"
              ? generateObjectType(def)
              : def.kind === "EnumTypeDefinition"
                ? generateEnumType(def)
                : def.kind === "InputObjectTypeDefinition"
                  ? generateInputObjectType(def)
                  : ""),
          ""
        ),
        { parser: "typescript" }
      )
    : exception("Invalid graphql schema. Try validating first.");
}

export function generateResolvers(schema: string): any {
  const nodes: IGQLDocument = gql([schema]);

  return nodes.kind === "Document"
    ? prettier.format(
        nodes.definitions.reduce(
          (acc: string, def: any) =>
            acc +
            (def.kind === "ObjectTypeDefinition"
              ? generateObjectType(def)
              : def.kind === "EnumTypeDefinition"
                ? generateEnumType(def)
                : def.kind === "InputObjectTypeDefinition"
                  ? generateInputObjectType(def)
                  : ""),
          ""
        ),
        { parser: "typescript" }
      )
    : exception("Invalid graphql schema. Try validating first.");
}

// export function generateMutations(
//   functionDefs: IFunctionDefinition[],
//   typeDefs: TypeDefinition[]
// ): string {
//   return "";
// }

// export function generateQueries(
//   functionDefs: IFunctionDefinition[],
//   typeDefs: TypeDefinition[]
// ): string {
//   return "";
// }

// export function generateResolvers(
//   functionDefs: IFunctionDefinition[],
//   typeDefs: TypeDefinition[]
// ): string {
//   return "";
// }
