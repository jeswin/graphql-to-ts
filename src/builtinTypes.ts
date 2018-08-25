import exception from "./exception";

export function toTSType(type: any): string {
  return type.kind === "NonNullType"
    ? toTSType(type.type).replace(/ \| null$/, "")
    : type.kind === "ListType"
      ? `[${toTSType(type.type)}] | null`
      : type.kind === "NamedType"
        ? `${getBasicTSType(type.name.value)} | null`
        : exception(`Unknown type kind ${type.kind}`);
}

function getBasicTSType(type: any) {
  return type === "String"
    ? "string"
    : type === "Int" || type === "Float"
      ? "number"
      : type === "Boolean"
        ? "boolean"
        : type === "ID"
          ? "string"
          : `I${type}`;
}
