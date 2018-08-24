import "mocha";
import "should";

import * as lib from "../";

type TestDef = {
  name: string;
  dir: string;
  method: Methods;
};

function toTestDef(item: [string, string, Methods] | TestDef): TestDef {
  return Array.isArray(item)
    ? {
        dir: item[1],
        method: item[2],
        name: item[0]
      }
    : item;
}

enum Methods {
  ToTypeDef
}

const testsList: ([string, string, Methods] | TestDef)[] = [
  ["Generates Object Types", "object-type", Methods.ToTypeDef],
  ["Generates Enum", "enum", Methods.ToTypeDef]
];

const tests = testsList.map(x => toTestDef(x));

describe("graphql-to-ts", () => {
  tests.forEach(t => {
    switch (t.method) {
      case Methods.ToTypeDef: {
        it(t.name, () => {
          const input = require(`./${t.dir}/input`).default.trim();
          const expected = require(`./${t.dir}/expected`).default.trim();
          const output = lib.generateTypeDefinitions(input);
          console.log(output);
        });
      }
    }
  });
});
