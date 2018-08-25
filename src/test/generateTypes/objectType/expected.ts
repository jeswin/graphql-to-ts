export default `
export interface IScuttlespaceUser {
  about?: string | null;
  domain?: string | null;
  enabled: boolean;
  externalId: string;
  pub: string;
  rowid: string;
  username: string;
  permissions?: [IPermissionDTO | null] | null;
}
`;
