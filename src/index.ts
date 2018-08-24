import prettier = require("prettier");
import gql from "graphql-tag";
import { inspect, isNull } from "util";
import exception from "./exception";

function generateObjectTypeDefinition(def: any) {
  return `
    export interface I${def.name.value} {
      ${def.fields
        .map((field: any) => {
          return field.kind === "FieldDefinition"
            ? (() => {
                const tsType = toTSType(field.type);
                const isNullable = tsType.endsWith(" | null");
                return `${field.name.value}${isNullable ? "?" : ""}: ${tsType}`;
              })()
            : exception(`Unknown graphql node with kind ${field.kind}.`);
        })
        .join(";")}
    }
  `;
}

interface ITSTypeParseResult {
  nullable: boolean;
  arrayDepth: number;
  type: string;
}

function toTSType(type: any): string {
  console.log(type);
  return type.kind === "NonNullType"
    ? toTSType(type.type).replace(/ \| null$/, "")
    : type.kind === "ListType"
      ? `[${toTSType(type.type)}] | null`
      : type.kind === "NamedType"
        ? `${getKnownTSType(type.name.value)} | null`
        : exception(`Unknown type kind ${type.kind}`);
}

function getKnownTSType(type: any) {
  return type === "String"
    ? "string"
    : type === "Int" || type === "Float"
      ? "number"
      : type === "Boolean"
        ? "boolean"
        : type;
}

export function generateTypeDefinitions(typeDefs: string): any {
  const nodes = gql([typeDefs]);

  let output = "";
  if (nodes.kind === "Document") {
    for (const def of nodes.definitions) {
      switch (def.kind) {
        case "ObjectTypeDefinition":
          output += generateObjectTypeDefinition(def);
          break;
        default:
          throw new Error(`Unknown graphql node with kind ${def.kind}.`);
      }
    }
    return prettier.format(output, { parser: "babylon" });
  } else {
    throw new Error("Invalid graphql schema. Try validating first.");
  }
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
