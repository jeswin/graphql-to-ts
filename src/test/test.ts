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
  ["objectType", "objectType"],
  ["enum", "enum"],
  ["input", "input"],
  ["types given mixed schema", "genTypesWithMixedSchema"],
  ["complex types", "complexTypes"],
  ["query", "query"],
  ["mutation", "mutation"]
] as [string, string][]).map(x => toTestDef(x));

const generateQueriesTests = ([["query", "query"]] as [string, string][]).map(
  x => toTestDef(x)
);

[
  //["generateTypes", generateTypesTests] as [string, TestDef[]],
  ["generateQueries", generateQueriesTests] as [string, TestDef[]]
].forEach(([methodType, testsList]) => {
  describe(methodType, () => {
    testsList.forEach(t => {
      it(t.name, () => {
        const input = require(`./${methodType}/${t.dir}/input`).default;
        const expected = require(`./${methodType}/${t.dir}/expected`).default;
        const output = lib.getQueries(input);
        output.should.deepEqual(expected);
      });
    });
  });
});
