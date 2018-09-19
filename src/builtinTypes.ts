import exception from "./exception";
import { ITSTypes, IGQLTypeNode, ITSTypeInfo } from "./types";

export function toTSType(
  gqlTypeNode: IGQLTypeNode,
  knownTypes: ITSTypes
): ITSTypeInfo<any> {
  return gqlTypeNode.kind === "NonNullType"
    ? { ...toTSType(gqlTypeNode.type, knownTypes), nullable: false }
    : gqlTypeNode.kind === "ListType"
      ? {
          kind: "List",
          type: toTSType(gqlTypeNode.type, knownTypes),
          nullable: true
        }
      : gqlTypeNode.kind === "NamedType"
        ? {
            kind: "Scalar",
            type: getBasicTSType(gqlTypeNode.name.value, knownTypes),
            nullable: true
          }
        : exception(
            `Unknown type kind ${
              (gqlTypeNode as any).kind
                ? (gqlTypeNode as any).kind
                : gqlTypeNode
            }`
          );
}

function getBasicTSType(type: string, knownTypes: ITSTypes) {
  return type === "String"
    ? "string"
    : type === "Int" || type === "Float"
      ? "number"
      : type === "Boolean"
        ? "boolean"
        : type === "ID"
          ? "string"
          : (() => {
              const matchingEnum = knownTypes.enums.find(
                x => x.graphqlType === type
              );
              return matchingEnum
                ? matchingEnum.name
                : (() => {
                    const matchingInterface = knownTypes.enums.find(
                      x => x.graphqlType === type
                    );
                    return matchingInterface
                      ? matchingInterface.name
                      : `I${type}`;
                  })();
            })();
}

export function isBuiltIn(type: string) {
  return ["string", "boolean", "number"].includes(type);
}

export function getRootType(type: ITSTypeInfo<any>): string {
  return type.kind === "Scalar"
    ? (type.type as string)
    : getRootType(type.type);
}
