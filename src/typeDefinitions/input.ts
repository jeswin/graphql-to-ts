import exception from "../exception";
import {
  IGQLInputObjectTypeDefinitionNode,
  ITSInterfaceDefinition,
  ITSTypes
} from "../types";
import { toTSType } from "../builtinTypes";

export default function getInputObjectType(
  def: IGQLInputObjectTypeDefinitionNode,
  index: number,
  knownTypes: ITSTypes
): ITSInterfaceDefinition {
  return {
    name: `I${def.name.value}`,
    graphqlType: def.name.value,
    extension: false,
    fields: def.fields.map(field => {
      return field.kind === "InputValueDefinition"
        ? (() => {
            const tsType = toTSType(field.type, knownTypes);
            return {
              name: field.name.value,
              nullable: tsType.endsWith(" | null"),
              type: tsType
            };
          })()
        : exception(`Unknown graphql node with kind ${field.kind}.`);
    }),
    index
  };
}
