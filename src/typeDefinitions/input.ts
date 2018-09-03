import exception from "../exception";
import {
  IGQLInputObjectTypeDefinitionNode,
  ITSInterfaceDefinition
} from "../types";
import { toTSType } from "../builtinTypes";

export default function getInputObjectType(
  def: IGQLInputObjectTypeDefinitionNode,
  index: number
): ITSInterfaceDefinition {
  return {
    name: `I${def.name.value}`,
    extension: false,
    fields: def.fields.map(field => {
      return field.kind === "InputValueDefinition"
        ? (() => {
            const tsType = toTSType(field.type);
            const isNullable = tsType.endsWith(" | null");
            return {
              name: field.name.value + (isNullable ? "?" : ""),
              type: tsType
            };
          })()
        : exception(`Unknown graphql node with kind ${field.kind}.`);
    }),
    index
  };
}
