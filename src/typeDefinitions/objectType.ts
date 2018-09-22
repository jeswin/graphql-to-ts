import exception from "../exception";
import { IGQLObjectTypeDefinitionNode, ITSInterface, ITSTypes } from "../types";
import { toTSType } from "../builtinTypes";
import { inspect } from "util";

export default function getObjectType(
  def: IGQLObjectTypeDefinitionNode,
  index: number,
  knownTypes: ITSTypes
): ITSInterface {
  return {
    name: `I${def.name.value}`,
    graphqlType: def.name.value,
    extension: def.kind === "ObjectTypeExtension",
    fields: def.fields.map(field => {
      return field.kind === "FieldDefinition"
        ? (() => {
            const tsType = toTSType(field.type, knownTypes);
            const tsName = field.name.value;
            return field.arguments && field.arguments.length
              ? {
                  arguments:
                    field.arguments && field.arguments.length
                      ? field.arguments.map(
                          f =>
                            f.kind === "InputValueDefinition"
                              ? (() => {
                                  const tsFieldType = toTSType(
                                    f.type,
                                    knownTypes
                                  );
                                  const tsFieldName = f.name.value;
                                  return {
                                    name: tsFieldName,
                                    type: tsFieldType
                                  };
                                })()
                              : exception(
                                  `Unknown graphql node with kind ${f.kind}.`
                                )
                        )
                      : [],
                  name: tsName,
                  type: tsType
                }
              : {
                  name: tsName,
                  arguments: [],
                  type: tsType
                };
          })()
        : exception(`Unknown graphql node with kind ${field.kind}.`);
    }),
    index
  };
}
