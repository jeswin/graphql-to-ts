import prettier = require("prettier");
import { typeToString, getTypes } from "..";
import { ITSEnum, ITSInterface } from "../types";

export default function(schema: string) {
  const types = getTypes(schema);

  return prettier.format(
    `
      ${generateEnums(types.enums)}
      ${generateInterfaces(
        types.interfaces.filter(x => !["IQuery", "IMutation"].includes(x.name))
      )}
      `,
    { parser: "typescript" }
  );
}

function generateEnums(enums: ITSEnum[]) {
  return enums.map(
    e => `
    export enum ${e.name} {
      ${e.values.map(v => `${v}="${v}"`).join(",")}
    }
    `
  );
}

function generateInterfaces(interfaces: ITSInterface[]) {
  return interfaces
    .map(
      i => `
    export interface ${i.name} {
      ${i.fields.map(f => `${f.name}: ${typeToString(f.type)};`).join("")}
    }
    `
    )
    .join("");
}
