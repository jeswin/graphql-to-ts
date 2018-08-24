import prettier = require("prettier");

export type TypeDefinition =
  | IObjectTypeDefinition
  | IInputDefinition
  | IEnumDefinition;

export interface IParameter {
  defaultValue: string;
  name: string;
  type: string;
}

export interface IField {
  name: string;
  type: string;
}

export interface IObjectField {
  name: string;
  type: string;
  params?: IParameter[];
}

export interface IObjectTypeDefinition {
  fields: IObjectField[];
  implements?: string;
  name: string;
  type: "type";
}

export interface IInputDefinition {
  fields: IField[];
  name: string;
  type: "input";
}

export interface IInterfaceDefinition {
  fields: IField[];
  name: string;
  type: "interface";
}

export interface IEnumDefinition {
  name: string;
  type: "enum";
  values: string[];
}

export interface IFunctionDefinition {
  name: string;
  params: IParameter[];
  returnType: string;
}

export interface IQuery {
  params: IParameter[];
  name: string;
}

export type IUnion = string[];

export function generateTypeDefinitions(
  functionDefs: IFunctionDefinition[],
  typeDefs: TypeDefinition[]
): string {
  return "";
}

export function generateMutations(
  functionDefs: IFunctionDefinition[],
  typeDefs: TypeDefinition[]
): string {
  return "";
}

export function generateQueries(
  functionDefs: IFunctionDefinition[],
  typeDefs: TypeDefinition[]
): string {
  return "";
}

export function generateResolvers(
  functionDefs: IFunctionDefinition[],
  typeDefs: TypeDefinition[]
): string {
  return "";
}
