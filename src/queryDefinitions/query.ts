import {
  ITSQuery,
  ITSTypes,
  ITSInterfaceDefinition,
  IGQLOperationDefinition,
  IGQLSelectionSet,
  IGQLSelection,
  ITSQuerySelectionSet
} from "../types";
import { inspect } from "util";
import { toTSType, isBuiltIn, getTypeFromNullable } from "../builtinTypes";
import exception from "../exception";

export default function generateQueryDefinition(
  def: IGQLOperationDefinition,
  types: ITSTypes,
  i: number,
  queryType: "query" | "mutation"
): ITSQuery {
  console.log(inspect(def, undefined, 12));
  const queryName = def.name.value;
  const variables = def.variableDefinitions
    .filter(x => x.kind === "VariableDefinition")
    .map(x => {
      const name = x.variable.name.value;
      const type = toTSType(x.type, types);
      return x.defaultValue
        ? { name, type, defaultValue: x.defaultValue }
        : { name, type };
    });

  const interfaceName = queryType === "mutation" ? "Mutation" : "Query";
  const tsInterface = types.interfaces.find(
    x => x.graphqlType === interfaceName
  );

  return tsInterface
    ? (() => {
        const selections = createSelections(
          queryName,
          {
            
          },
          def.selectionSet,
          tsInterface,
          types
        );
        return {
          index: i,
          name: queryName,
          selections,
          variables
        };
      })()
    : exception(
        `1: Interface ${interfaceName} referenced in query ${queryName} is missing.`
      );
}

function createSelections(
  queryName: string,
  outputTSType: ITSQuerySelectionSet,
  selectionSet: IGQLSelectionSet,
  currentTSType: ITSInterfaceDefinition,
  types: ITSTypes
): ITSQuerySelectionSet {
  return selectionSet.selections.reduce((acc, selection) => {
    const fieldName = selection.name.value;
    const tsField = currentTSType.fields.find(x => x.name === fieldName);
    return tsField
      ? ((acc[fieldName] = !selection.selectionSet
          ? tsField.type
          : (() => {
              const tsFieldType = getTypeFromNullable(tsField.type);
              const newCurrentTSType = types.interfaces.find(
                x => x.name === tsFieldType
              );
              return newCurrentTSType
                ? createSelections(
                    queryName,
                    {},
                    selection.selectionSet,
                    newCurrentTSType,
                    types
                  )
                : exception(
                    `3: Interface ${tsFieldType} referenced in query ${queryName} is missing.`
                  );
            })()),
        acc)
      : exception(
          `2: Interface ${fieldName} referenced in query ${queryName} is missing.`
        );
  }, outputTSType);
}
