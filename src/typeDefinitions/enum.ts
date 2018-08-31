import { IEnumTypeDefinitionNode, ITSEnumDefinition } from "../types";

export function getEnumType(
  def: IEnumTypeDefinitionNode,
  index: number
): ITSEnumDefinition {
  return {
    name: def.name.value,
    values: def.values.map(value => value.name.value),
    index
  };
}
