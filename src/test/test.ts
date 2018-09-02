import "mocha";
import "should";

import * as lib from "../";
import { inspect } from "util";

type TestDef = {
  name: string;
  dir: string;
};

function toTestDef(item: [string, string] | TestDef): TestDef {
  return Array.isArray(item)
    ? {
        dir: item[1],
        name: item[0]
      }
    : item;
}

const generateTypesTests = ([
  ["type", "objectType"],
  ["enum", "enum"],
  ["input", "input"],
  ["types given mixed schema", "genTypesWithMixedSchema"],
  ["complex types", "complexTypes"],
  ["query", "query"],
  ["mutation", "mutation"],
] as [string, string][]).map(x => toTestDef(x));

describe("generateTypes", () => {
  generateTypesTests.forEach(t => {
    it(t.name, () => {
      const input = require(`./generateTypes/${t.dir}/input`).default;
      const expected = require(`./generateTypes/${t.dir}/expected`).default;
      const output = lib.getTypes(input);
      output.should.deepEqual(expected);
    });
  });
});
