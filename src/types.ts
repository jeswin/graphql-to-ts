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

export interface IGQLVariableNode {
  kind: "Variable";
  name: IGQLNameNode;
}

export interface IGQLArgumentNode {
  kind: "Argument";
  name: IGQLNameNode;
  value: IGQLVariableNode;
}

export interface IGQLSelectionNode {
  kind: "Field";
  name: IGQLNameNode;
  arguments?: IGQLArgumentNode[];
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

export type IGQLDefinition =
  | IGQLObjectTypeDefinitionNode
  | IGQLEnumTypeDefinitionNode
  | IGQLInputObjectTypeDefinitionNode
  | IGQLOperationDefinitionNode;

export interface IGQLDocumentNode {
  kind: "Document";
  definitions: IGQLDefinition[];
}

/* TypeScript Types */
export interface ITSTypeInfo<T> {
  kind: "Scalar" | "List";
  type: T;
  nullable: boolean;
}
export interface ITSScalarTypeInfo extends ITSTypeInfo<string> {
  kind: "Scalar";
}

export interface ITSListTypeInfo extends ITSTypeInfo<ITSTypeInfo<any>> {
  kind: "List";
}

export interface ITSInputValue {
  name: string;
  type: ITSTypeInfo<any>;
}

export interface ITSField {
  name: string;
  arguments?: ITSInputValue[];
  type: ITSTypeInfo<any>;
}

export interface ITSTypeBase {
  index: number;
}

export interface ITSInterface extends ITSTypeBase {
  name: string;
  graphqlType: string;
  extension: boolean;
  fields: ITSField[];
}

export interface ITSEnum extends ITSTypeBase {
  name: string;
  graphqlType: string;
  values: string[];
}

export interface ITSTypes {
  enums: ITSEnum[];
  interfaces: ITSInterface[];
}

export interface ITSQueryVariable {
  name: string;
  type: ITSTypeInfo<any>;
  defaultValue?: string | number | boolean;
}

export interface ITSQueryArgument {
  name: string;
  value: string;
}

export interface ITSQuerySelectionSimpleField {
  name: string;
  type: ITSTypeInfo<any>;
}

export interface ITSQuerySelectionCompositeField {
  name: string;
  arguments?: ITSQueryArgument[];
  selections?: TSQuerySelection[];
}

export type TSQuerySelection =
  | ITSQuerySelectionSimpleField
  | ITSQuerySelectionCompositeField;

export interface ITSQuery extends ITSTypeBase {
  index: number;
  name: string;
  selections: TSQuerySelection[];
  variables: ITSQueryVariable[];
}

export interface ITSQueries {
  queries: ITSQuery[];
  mutations: ITSQuery[];
}
