import { IEnumTypeDefinitionNode, ITSEnumDefinition } from "../types";

export function getEnumType(
  def: IEnumTypeDefinitionNode
): ITSEnumDefinition {
  return {
    name: def.name.value,
    values: def.values.map(value => value.name.value)
  };
}
