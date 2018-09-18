export interface IGQLNameNode {
  kind: "Name";
  value: string;
}

export interface IGQLNamedNode {
  name: IGQLNameNode;
  description?: string;
}

/* Basic Types in GQL */

export interface IGQLNamedTypeNode {
  kind: "NamedType";
  name: { kind: "Name"; value: string };
}

export interface IGQLListTypeNode {
  kind: "ListType";
  type: IGQLNamedTypeNode | IGQLNonNullTypeNode;
}

export interface IGQLNonNullTypeNode {
  kind: "NonNullType";
  type: IGQLListTypeNode | IGQLNamedTypeNode;
}

export type IGQLTypeNode =
  | IGQLNamedTypeNode
  | IGQLListTypeNode
  | IGQLNonNullTypeNode;

/* Type Definitions in a GQL Document */

export interface IGQLFieldDefinitionNode extends IGQLNamedNode {
  kind: "FieldDefinition";
  type: IGQLTypeNode;
  arguments?: IGQLInputValueDefinitionNode[];
}

export interface IGQLObjectTypeDefinitionNode extends IGQLNamedNode {
  kind: "ObjectTypeDefinition" | "ObjectTypeExtension";
  fields: IGQLFieldDefinitionNode[];
}

export interface IGQLInputValueDefinitionNode extends IGQLNamedNode {
  kind: "InputValueDefinition";
  type: IGQLTypeNode;
}

export interface IGQLInputObjectTypeDefinitionNode extends IGQLNamedNode {
  kind: "InputObjectTypeDefinition";
  fields: IGQLInputValueDefinitionNode[];
}

export interface IGQLEnumValueDefinitionNode extends IGQLNamedNode {
  kind: "EnumValueDefinition";
  description: string;
}

export interface IGQLEnumTypeDefinitionNode extends IGQLNamedNode {
  kind: "EnumTypeDefinition";
  values: IGQLEnumValueDefinitionNode[];
}

export type IGQLTypeDefinitionNode =
  | IGQLEnumTypeDefinitionNode
  | IGQLInputObjectTypeDefinitionNode
  | IGQLObjectTypeDefinitionNode;

/* GQL Query Nodes */

export interface IGQLVariableDefinitionNode {
  kind: "VariableDefinition";
  variable: { kind: "Variable"; name: IGQLNameNode };
  type: IGQLTypeNode;
  defaultValue: number | string | boolean;
}

export interface IGQLSelectionNode {
  kind: "Field";
  name: IGQLNameNode;
  selectionSet?: IGQLSelectionSetNode;
}

export interface IGQLSelectionSetNode {
  kind: "SelectionSet";
  selections: IGQLSelectionNode[];
}

export interface IGQLOperationDefinitionNode extends IGQLNamedNode {
  kind: "OperationDefinition";
  operation: "query" | "mutation";
  variableDefinitions: IGQLVariableDefinitionNode[];
  selectionSet: IGQLSelectionSetNode;
}

export interface IGQLDocumentNode {
  kind: "Document";
  definitions: IGQLNamedNode[];
}


/* TypeScript Types */

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
  [key: string]: string | ITSQuerySelection;
}

export interface ITSQuery extends ITSTypeEntry {
  index: number;
  name: string;
  selections: ITSQuerySelection;
  variables: ITSQueryVariable[];
}

export interface ITSQueryTypes {
  queries: ITSQuery[];
  mutations: ITSQuery[];
}
