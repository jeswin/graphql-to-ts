import prettier = require("prettier");
import gql from "graphql-tag";
import { inspect, isNull, log } from "util";
import exception from "./exception";
import { getObjectType } from "./typeDefinitions/objectType";
import { getEnumType } from "./typeDefinitions/enum";
import { getInputObjectType } from "./typeDefinitions/input";
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
        (acc: ITSTypes, def: any) =>
          def.kind === "ObjectTypeDefinition"
            ? {
                ...acc,
                interfaces: acc.interfaces.concat(getObjectType(def))
              }
            : def.kind === "EnumTypeDefinition"
              ? {
                  ...acc,
                  enums: acc.enums.concat(getEnumType(def))
                }
              : def.kind === "InputObjectTypeDefinition"
                ? {
                    ...acc,
                    interfaces: acc.interfaces.concat(getInputObjectType(def))
                  }
                : acc,
        { interfaces: [], enums: [] }
      )
    : exception("Invalid graphql schema. Try validating first.");
}

function generateEnums(enums: ITSEnumDefinition[]) {
  return enums.map(
    e => `
    export enum ${e.name} {
      ${e.values.join(",")}
    }
  `
  );
}

function generateInterfaces(interfaces: ITSInterfaceDefinition[]) {
  return interfaces
    .map(
      i => `
    export interface ${i.name} {
      ${i.fields.map(f => `${f.name}: ${f.type};`).join("")}
    }
  `
    )
    .join("");
}

export function generateTypes(schema: string) {
  const gqlDoc: IGQLDocument = gql([schema]);

  const types = getTypes(schema);
  return prettier.format(
    `
    ${generateEnums(types.enums)};
    ${generateInterfaces(types.interfaces)}
  `,
    { parser: "typescript" }
  );
}

// export function generateResolvers(schema: string): any {
//   const nodes: IGQLDocument = gql([schema]);

//   return nodes.kind === "Document"
//     ? prettier.format(
//         nodes.definitions.reduce(
//           (acc: string, def: any) =>
//             acc +
//             (def.kind === "ObjectTypeDefinition"
//               ? generateObjectType(def)
//               : def.kind === "EnumTypeDefinition"
//                 ? generateEnumType(def)
//                 : def.kind === "InputObjectTypeDefinition"
//                   ? generateInputObjectType(def)
//                   : ""),
//           ""
//         ),
//         { parser: "typescript" }
//       )
//     : exception("Invalid graphql schema. Try validating first.");
// }

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
