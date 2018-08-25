import exception from "../exception";
import {
  IGQLObjectTypeDefinitionNode,
  IGQLInputObjectTypeDefinitionNode
} from "../types";
import { inspect } from "util";
import { toTSType } from "../builtinTypes";

export function generateInputObjectType(
  def: IGQLInputObjectTypeDefinitionNode
) {
  return `
    export interface I${def.name.value} {
      ${def.fields
        .map(field => {
          return field.kind === "InputValueDefinition"
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
