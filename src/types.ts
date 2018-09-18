export interface IGQLNameNode {
  kind: "Name";
  value: any;
}

export interface IGQLNamedNode {
  name: IGQLNameNode;
  description?: string;
}

export interface IGQLFieldDefinitionNode extends IGQLNamedNode {
  kind: "FieldDefinition";
  type: any;
  arguments?: IGQLInputValueDefinitionNode[];
}

export interface IGQLObjectTypeDefinitionNode extends IGQLNamedNode {
  kind: "ObjectTypeDefinition" | "ObjectTypeExtension";
  fields: IGQLFieldDefinitionNode[];
}

export interface IGQLInputValueDefinitionNode extends IGQLNamedNode {
  kind: "InputValueDefinition";
  type: any;
}

export interface IGQLInputObjectTypeDefinitionNode extends IGQLNamedNode {
  kind: "InputObjectTypeDefinition";
  fields: IGQLInputValueDefinitionNode[];
}

export interface IGQLEnumValueDefinitionNode extends IGQLNamedNode {
  kind: "EnumValueDefinition";
  description: string;
}

export interface IEnumTypeDefinitionNode extends IGQLNamedNode {
  kind: "EnumTypeDefinition";
  values: IGQLEnumValueDefinitionNode[];
}

export interface IGQLVariableDefinition {
  kind: "VariableDefinition";
  variable: { kind: "Variable"; name: { kind: "Name"; value: string } };
  type: any;
  defaultValue: number | string | boolean;
}

export interface IGQLSelectionSet {
  kind: "SelectionSet";
  selections: IGQLSelection[];
}

export interface IGQLSelection {
  kind: "Field";
  name: IGQLNameNode;
  selectionSet?: IGQLSelectionSet;
}

export interface IGQLOperationDefinition extends IGQLNamedNode {
  kind: "OperationDefinition";
  operation: "query" | "mutation";
  variableDefinitions: IGQLVariableDefinition[];
  selectionSet: IGQLSelectionSet;
}

export interface IGQLDocument {
  kind: "Document";
  definitions: IGQLNamedNode[];
}

export interface ITSInputValue {
  name: string;
  type: string;
  nullable: boolean;
}

export interface ITSField {
  name: string;
  arguments?: ITSInputValue[];
  type: string;
  nullable: boolean;
}

export interface ITSTypeEntry {
  index: number;
}

export interface ITSInterfaceDefinition extends ITSTypeEntry {
  name: string;
  graphqlType: string;
  extension: boolean;
  fields: ITSField[];
}

export interface ITSEnumDefinition extends ITSTypeEntry {
  name: string;
  graphqlType: string;
  values: string[];
}

export interface ITSTypes {
  enums: ITSEnumDefinition[];
  interfaces: ITSInterfaceDefinition[];
}

export interface ITSQueryVariable {
  name: string;
  type: string;
  defaultValue?: string | number | boolean;
  nullable: boolean;
}

export interface ITSQuerySelection {
  [key: string]: string | ITSQuerySelection | ITSQuerySelection[];
}

export interface ITSQuery extends ITSTypeEntry {
  index: number;
  name: string;
  selections: ITSQuerySelection[];
  variables: ITSQueryVariable[];
}

export interface ITSQueryTypes {
  queries: ITSQuery[];
  mutations: ITSQuery[];
}
