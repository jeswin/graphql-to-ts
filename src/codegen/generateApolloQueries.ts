import changeCase = require("change-case");
import prettier = require("prettier");
import {
  getQueries,
  selectionObjectToTypeString,
  typeToString,
  getTypes
} from "..";
import { ITSQuery } from "../types";

export interface IGenerateApolloQueriesOpts {
  graphqlTypesModule: string;
}

export default function(
  queries: string,
  gqlSchema: string,
  opts: IGenerateApolloQueriesOpts
) {
  const fixedSchema = gqlSchema
    .replace("extend type Query", "type Query")
    .replace("extend type Mutation", "type Mutation");

  const types = getTypes(gqlSchema);
  const typeNames = types.enums
    .map(e => e.name)
    .concat(types.interfaces.map(e => e.name));
  let output = `
    ${
      typeNames.length
        ? `import { ${typeNames.join(",")} } from "${opts.graphqlTypesModule}";`
        : ""
    }
    import { ApolloClient } from "apollo-client";
    import gql from "graphql-tag";
    ${(() => {
      const generated = getQueries(queries, fixedSchema);
      return (
        generateCode("query", "query", generated.queries) +
        generateCode("mutate", "mutation", generated.mutations)
      );
    })()}
  `;

  return prettier.format(output, { parser: "typescript" });
}

function generateCode(
  apolloClientMethod: "mutate" | "query",
  type: "mutation" | "query",
  parsedQueries: ITSQuery[]
) {
  return parsedQueries
    .map(query => {
      const invokeFunctionName = `invoke${query.name}`;
      const invokeFunctionArgs = query.variables
        .map(x => `${x.name}: ${typeToString(x.type, true)}`)
        .concat("apolloClient: ApolloClient<any>")
        .join(", ");
      const apolloClientVariables = query.variables.map(x => x.name).join(", ");
      return `
          const ${changeCase.camelCase(query.name)}GQL = \`${query.gql}\`;
          export async function ${invokeFunctionName}(
            ${invokeFunctionArgs}
          ): Promise<${selectionObjectToTypeString(query.selections)}> {
            try {
              const result = await apolloClient.${apolloClientMethod}({
                ${type}: gql(${changeCase.camelCase(query.name)}GQL),
                variables: {
                  ${apolloClientVariables}
                }
              });
              return result.data as any;
            } catch (ex) {
              throw ex;
            }
          }
          `;
    })
    .join("\n");
}
