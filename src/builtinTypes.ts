import exception from "./exception";
import { ITSTypes, IGQLTypeNode } from "./types";

export function toTSType(
  gqlTypeNode: IGQLTypeNode,
  knownTypes: ITSTypes
): string {
  return gqlTypeNode.kind === "NonNullType"
    ? toTSType(gqlTypeNode.type, knownTypes).replace(/ \| undefined$/, "")
    : gqlTypeNode.kind === "ListType"
      ? makeNullable(`(${toTSType(gqlTypeNode.type, knownTypes)})[]`)
      : gqlTypeNode.kind === "NamedType"
        ? makeNullable(getBasicTSType(gqlTypeNode.name.value, knownTypes))
        : exception(
            `Unknown type kind ${
              (gqlTypeNode as any).kind
                ? (gqlTypeNode as any).kind
                : gqlTypeNode
            }`
          );
}

function makeNullable(type: string) {
  return !type.endsWith("| undefined") ? `${type} | undefined` : type;
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

export function isBuiltIn(maybeNullable: string) {
  const type = getTypeFromNullable(maybeNullable);
  return ["string", "boolean", "number"].includes(type);
}

export function getTypeFromNullable(maybeNullable: string) {
  return maybeNullable.replace(/ \| undefined$/, "");
}

export function isNullable(maybeNullable: string) {
  return maybeNullable.endsWith("| undefined");
}
