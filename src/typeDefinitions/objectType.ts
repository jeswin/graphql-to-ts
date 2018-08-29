import exception from "../exception";
import { IGQLObjectTypeDefinitionNode, ITSInterfaceDefinition } from "../types";
import { toTSType } from "../builtinTypes";

export function getObjectType(
  def: IGQLObjectTypeDefinitionNode
): ITSInterfaceDefinition {
  return {
    name: `I${def.name.value}`,
    fields: def.fields.map(field => {
      return field.kind === "FieldDefinition"
        ? (() => {
            const tsType = toTSType(field.type);
            const isNullable = tsType.endsWith(" | null");
            return {
              name: field.name.value + (isNullable ? "?" : ""),
              type: tsType
            };
          })()
        : exception(`Unknown graphql node with kind ${field.kind}.`);
    })
  };
}
