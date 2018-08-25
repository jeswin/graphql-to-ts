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
}

export interface IGQLObjectTypeDefinitionNode extends IGQLNamedNode {
  kind: "ObjectTypeDefinition";
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

export interface IGQLDocument {
  kind: "Document";
  definitions: IGQLNamedNode[];
}
