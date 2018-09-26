import { IGQLEnumTypeDefinitionNode, ITSEnum, ITSTypes } from "../types";
const { print } = require("graphql/language/printer");

export default function getEnumType(
  def: IGQLEnumTypeDefinitionNode,
  index: number,
  knownTypes: ITSTypes
): ITSEnum {
  return {
    name: def.name.value,
    graphqlType: def.name.value,
    values: def.values.map(value => value.name.value),
    index,
    gql: print(def)
  };
}
