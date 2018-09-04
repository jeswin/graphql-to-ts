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
    extension: def.kind === "ObjectTypeExtension",
    fields: def.fields.map(field => {
      return field.kind === "FieldDefinition"
        ? (() => {
            const tsType = toTSType(field.type);
            const nullable = tsType.endsWith(" | null");
            const tsName = field.name.value;
            return field.arguments && field.arguments.length
              ? {
                  arguments:
                    field.arguments && field.arguments.length
                      ? field.arguments.map(
                          f =>
                            f.kind === "InputValueDefinition"
                              ? (() => {
                                  const tsFieldType = toTSType(f.type);
                                  const tsFieldName = f.name.value;
                                  return {
                                    name: tsFieldName,
                                    nullable: tsFieldType.endsWith(" | null"),
                                    type: tsFieldType
                                  };
                                })()
                              : exception(
                                  `Unknown graphql node with kind ${f.kind}.`
                                )
                        )
                      : undefined,
                  nullable,
                  name: tsName,
                  type: tsType
                }
              : {
                  nullable,
                  name: tsName,
                  type: tsType
                };
          })()
        : exception(`Unknown graphql node with kind ${field.kind}.`);
    }),
    index
  };
}
