import exception from "../exception";
import {
  IGQLInputObjectTypeDefinitionNode,
  ITSInterface,
  ITSTypes
} from "../types";
import { toTSType } from "../builtinTypes";
const { print } = require("graphql/language/printer");

export default function getInputObjectType(
  def: IGQLInputObjectTypeDefinitionNode,
  index: number,
  knownTypes: ITSTypes
): ITSInterface {
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
              type: tsType
            };
          })()
        : exception(`Unknown graphql node with kind ${field.kind}.`);
    }),
    index,
    gql: print(def)
  };
}
