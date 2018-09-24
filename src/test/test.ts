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

[["generateTypes", generateTypesTests] as [string, TestDef[]]].forEach(
  ([methodType, testsList]) => {
    describe(methodType, () => {
      testsList.forEach(t => {
        it(t.name, () => {
          const schema = require(`./${methodType}/${t.dir}/input`).default;
          const expected = require(`./${methodType}/${t.dir}/expected`).default;
          const output = lib.getTypes(schema);
          output.should.deepEqual(expected);
        });
      });
    });
  }
);

const generateQueriesTests = ([
  ["query", "query"],
  ["mutation", "mutation"]
] as [string, string][]).map(x => toTestDef(x));

[["generateQueries", generateQueriesTests] as [string, TestDef[]]].forEach(
  ([methodType, testsList]) => {
    describe(methodType, () => {
      testsList.forEach(t => {
        it(t.name, () => {
          const schema = require(`./${methodType}/${t.dir}/input`).schema;
          const queries = require(`./${methodType}/${t.dir}/input`).queries;
          const expected = require(`./${methodType}/${t.dir}/expected`).default;
          const output = lib.getQueries(queries, schema);
          output.should.deepEqual(expected);
        });
      });
    });
  }
);

const typeToStringTests = ([
  ["simple", "simple"],
  ["nullable", "nullable"],
  ["simple-list", "simple-list"],
  ["nullable-list", "nullable-list"],
  ["nullable-list-nullable", "nullable-list-nullable"]
] as [string, string][]).map(x => toTestDef(x));

[["typeToString", typeToStringTests] as [string, TestDef[]]].forEach(
  ([methodType, testsList]) => {
    describe(methodType, () => {
      testsList.forEach(t => {
        it(t.name, () => {
          const input = require(`./${methodType}/${t.dir}/input`).default;
          const expected = require(`./${methodType}/${t.dir}/expected`).default;
          const output = lib.typeToString(input);
          output.should.deepEqual(expected);
        });
      });
    });
  }
);

const selectionTypeToObjectTests = ([["simple", "simple"]] as [
  string,
  string
][]).map(x => toTestDef(x));

[
  ["selectionTypeToObject", selectionTypeToObjectTests] as [string, TestDef[]]
].forEach(([methodType, testsList]) => {
  describe(methodType, () => {
    testsList.forEach(t => {
      it(t.name, () => {
        const input = require(`./${methodType}/${t.dir}/input`).default;
        const expected = require(`./${methodType}/${t.dir}/expected`).default;
        const output = lib.querySelectionsToObject(input);
        output.should.deepEqual(expected);
      });
    });
  });
});
