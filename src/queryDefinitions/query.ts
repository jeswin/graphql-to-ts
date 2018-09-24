import {
  ITSQuery,
  ITSTypes,
  ITSInterface,
  IGQLOperationDefinitionNode,
  IGQLSelectionSetNode,
  TSQuerySelection,
  ITSQueryVariable,
  ITSQuerySelectionSimpleField,
  ITSQuerySelectionCompositeField
} from "../types";
import { toTSType, getRootType } from "../builtinTypes";
import exception from "../exception";
import { inspect } from "util";

export default function generateQueryDefinition(
  def: IGQLOperationDefinitionNode,
  types: ITSTypes,
  i: number,
  queryType: "query" | "mutation"
): ITSQuery {
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
            type
          }
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
          def.selectionSet,
          tsInterface,
          types
        );
        return selections
          ? {
              index: i,
              name: queryName,
              selections,
              variables
            }
          : exception(`Something must be selected in a query.`);
      })()
    : exception(
        `Interface ${interfaceName} referenced in query ${queryName} is missing.`
      );
}

function createSelections(
  queryName: string,
  selectionSet: IGQLSelectionSetNode,
  currentTSType: ITSInterface,
  types: ITSTypes
): TSQuerySelection[] {
  const result = selectionSet.selections.reduce(
    (acc, selection) => {
      const fieldName: string = selection.name.value;
      const tsField = currentTSType.fields.find(x => x.name === fieldName);
      return tsField
        ? acc.concat(
            !selection.selectionSet
              ? ({
                  name: fieldName,
                  arguments:
                    selection.arguments &&
                    selection.arguments.map(arg => ({
                      name: arg.name.value,
                      value: arg.value.name.value
                    })),
                  type: tsField.type
                } as ITSQuerySelectionSimpleField)
              : ({
                  name: fieldName,
                  arguments:
                    selection.arguments &&
                    selection.arguments.map(arg => ({
                      name: arg.name.value,
                      value: arg.value.name.value
                    })),
                  selections: (() => {
                    const rootType = getRootType(tsField.type);
                    const newCurrentTSType = types.interfaces.find(
                      x => x.name === rootType
                    );
                    return newCurrentTSType
                      ? createSelections(
                          queryName,
                          selection.selectionSet,
                          newCurrentTSType,
                          types
                        )
                      : exception(
                          `Interface ${rootType} referenced in query ${queryName} is missing.`
                        );
                  })()
                } as ITSQuerySelectionCompositeField)
          )
        : exception(
            `Interface ${fieldName} referenced in query ${queryName} is missing.`
          );
    },
    [] as TSQuerySelection[]
  );
  return result;
}
