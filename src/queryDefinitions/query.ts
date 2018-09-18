import {
  ITSQuery,
  ITSTypes,
  ITSInterfaceDefinition,
  IGQLOperationDefinitionNode,
  IGQLSelectionSetNode,
  ITSQuerySelection,
  ITSQueryVariable
} from "../types";
import { inspect, isNull } from "util";
import {
  toTSType,
  isBuiltIn,
  getTypeFromNullable,
  isNullable
} from "../builtinTypes";
import exception from "../exception";

export default function generateQueryDefinition(
  def: IGQLOperationDefinitionNode,
  types: ITSTypes,
  i: number,
  queryType: "query" | "mutation"
): ITSQuery {
  console.log(inspect(def, undefined, 12));
  const queryName = def.name.value;

  const variables: ITSQueryVariable[] = def.variableDefinitions
    .filter(x => x.kind === "VariableDefinition")
    .map(x => {
      const name = x.variable.name.value;
      const type = toTSType(x.type, types);
      return x.defaultValue
        ? {
            defaultValue: x.defaultValue,
            name,
            nullable: isNullable(type),
            type
          }
        : { name, type, nullable: isNullable(type) };
    });

  const interfaceName = queryType === "mutation" ? "Mutation" : "Query";
  const tsInterface = types.interfaces.find(
    x => x.graphqlType === interfaceName
  );

  return tsInterface
    ? (() => {
        const selections = createSelections(
          queryName,
          {},
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
  outputTSType: ITSQuerySelection,
  selectionSet: IGQLSelectionSetNode,
  currentTSType: ITSInterfaceDefinition,
  types: ITSTypes
): ITSQuerySelection {
  return selectionSet.selections.reduce((acc, selection) => {
    const fieldName: string = selection.name.value;
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
