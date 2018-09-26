export default `
export interface IPermission {
  rowid: string;
  assigner: IScuttlespaceUser;
  assignee: IScuttlespaceUser;
  permissions: string | null;
}

export interface IScuttlespaceUser {
  about: string | null;
  domain: string | null;
  enabled: boolean;
  externalId: string;
  pub: string;
  rowid: string;
  username: string;
  permissions: (IPermission | null)[] | null;
}
`.trimLeft();
