import prettier = require("prettier");
import { getTypes, typeToString } from "..";
import { ITSInterface } from "../types";

export interface IGenerateResolversOpts {
  apiModule: string;
  graphqlModule: string;
  parseResultModule: string;
  parseResultFunctionName: string;
}

export default function(gqlSchema: string, opts: IGenerateResolversOpts) {
  const types = getTypes(gqlSchema);

  const query = types.interfaces.find(x => x.name === "IQuery");
  const mutation = types.interfaces.find(x => x.name === "IMutation");

  const allTypes = types.interfaces
    .filter(x => !["IQuery", "IMutation"].includes(x.name))
    .map(x => x.name)
    .sort();

  const allMethods = ((query && query.fields) || [])
    .map(x => x.name)
    .concat(((mutation && mutation.fields) || []).map(x => x.name))
    .sort();

  type IResolverTypes = [string, ITSInterface | undefined];

  const resolverTypes: IResolverTypes[] = [
    ["Mutation", mutation],
    ["Query", query]
  ];

  const output = `
    import { ${opts.parseResultFunctionName} } from "${opts.parseResultModule}";
    import { ${allTypes.join(",")} } from "${opts.graphqlModule}";
    import { ${allMethods.join(",")} } from "${opts.apiModule}";
  
    export default {
      ${resolverTypes
        .map(
          ([prop, queryOrMutation]) => `
          ${prop}: {
            ${
              queryOrMutation
                ? queryOrMutation.fields
                    .map(
                      f => `
                        async ${f.name}(
                          root: any,
                          args: {
                            ${
                              f.arguments && f.arguments.length
                                ? f.arguments
                                    .map(
                                      a => `${a.name}: ${typeToString(a.type)}`
                                    )
                                    .join(",")
                                : ""
                            }
                          },          
                          context: any
                        ): Promise<${typeToString(f.type)}> {
                          const result = await ${f.name}(args, context);
                          return await ${opts.parseResultFunctionName}(result);
                        }
                      `
                    )
                    .join(",")
                : ""
            }
          }
        `
        )
        .join(",")}
    };
  `;

  return prettier.format(output, { parser: "typescript" });
}
