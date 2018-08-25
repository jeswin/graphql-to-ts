import { IEnumTypeDefinitionNode } from "../types";
import { inspect } from "util";

export function generateEnumType(def: IEnumTypeDefinitionNode) {
  return `
    export enum ${def.name.value} {
      ${def.values.map(value => value.name.value).join(",")}
    }
  `;
}
