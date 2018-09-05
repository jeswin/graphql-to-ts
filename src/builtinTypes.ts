import exception from "./exception";
import { ITSTypes } from "./types";

export function toTSType(type: any, knownTypes: ITSTypes): string {
  return type.kind === "NonNullType"
  ? toTSType(type.type, knownTypes).replace(/ \| null$/, "")
  : type.kind === "ListType"
  ? `[${toTSType(type.type, knownTypes)}] | null`
  : type.kind === "NamedType"
  ? `${getBasicTSType(type.name.value, knownTypes)} | null`
  : exception(`Unknown type kind ${type.kind}`);
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
                      : `I${type}`
                  })();
            })();
}
