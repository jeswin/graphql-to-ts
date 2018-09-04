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
  extension: boolean;
  fields: ITSField[];
}

export interface ITSEnumDefinition extends ITSTypeEntry {
  name: string;
  values: string[];
}

export interface ITSTypes {
  enums: ITSEnumDefinition[];
  interfaces: ITSInterfaceDefinition[];
}
