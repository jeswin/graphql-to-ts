import "mocha";
import "should";

import * as lib from "../";

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
  ["complex types", "complexTypes"]
] as [string, string][]).map(x => toTestDef(x));

function runTests(parentDir: string, tests: TestDef[]) {
  tests.forEach(t => {
    it(t.name, () => {
      const input = require(`./${parentDir}/${t.dir}/input`).default;
      const expected = require(`./${parentDir}/${
        t.dir
      }/expected`).default.trim();
      const output = lib.generateTypes(input);
      output.should.equal(expected + "\n"); //prettier adds a \n
    });
  });
}

describe("generateTypes", () => {
  runTests("generateTypes", generateTypesTests);
});
