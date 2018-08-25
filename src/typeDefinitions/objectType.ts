import exception from "../exception";
import { IGQLObjectTypeDefinitionNode } from "../types";
import { inspect } from "util";
import { toTSType } from "../builtinTypes";

export function generateObjectType(def: IGQLObjectTypeDefinitionNode) {
  return `
    export interface I${def.name.value} {
      ${def.fields
        .map(field => {
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
