import exception from "../exception";
import { IGQLObjectTypeDefinitionNode, ITSInterfaceDefinition } from "../types";
import { toTSType } from "../builtinTypes";
import { inspect } from "util";

export default function getObjectType(
  def: IGQLObjectTypeDefinitionNode,
  index: number
): ITSInterfaceDefinition {
  return {
    name: `I${def.name.value}`,
    fields: def.fields.map(field => {
      return field.kind === "FieldDefinition"
        ? (() => {
            const tsType = toTSType(field.type);
            const isNullable = tsType.endsWith(" | null");
            const tsName = field.name.value + (isNullable ? "?" : "");
            return field.arguments && field.arguments.length
              ? {
                  arguments:
                    field.arguments && field.arguments.length
                      ? field.arguments.map(
                          f =>
                            f.kind === "InputValueDefinition"
                              ? (() => {
                                  const tsFieldType = toTSType(f.type);
                                  const isFieldNullable = tsFieldType.endsWith(
                                    " | null"
                                  );
                                  const tsFieldName =
                                    f.name.value + (isFieldNullable ? "?" : "");

                                  return {
                                    name: tsFieldName,
                                    type: tsFieldType
                                  };
                                })()
                              : exception(
                                  `Unknown graphql node with kind ${f.kind}.`
                                )
                        )
                      : undefined,
                  name: tsName,
                  type: tsType
                }
              : {
                  name: tsName,
                  type: tsType
                };
          })()
        : exception(`Unknown graphql node with kind ${field.kind}.`);
    }),
    index
  };
}
