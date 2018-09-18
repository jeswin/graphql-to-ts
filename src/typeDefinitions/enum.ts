import { IGQLEnumTypeDefinitionNode, ITSEnumDefinition, ITSTypes } from "../types";

export default function getEnumType(
  def: IGQLEnumTypeDefinitionNode,
  index: number,
  knownTypes: ITSTypes
): ITSEnumDefinition {
  return {
    name: def.name.value,
    graphqlType: def.name.value,
    values: def.values.map(value => value.name.value),
    index
  };
}
