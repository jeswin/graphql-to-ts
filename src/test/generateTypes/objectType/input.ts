export default `
type PermissionDTO {
  resource: String!
  allow: Boolean!
}

type ScuttlespaceUser {
  about: String
  domain: String
  enabled: Boolean!
  externalId: String!
  pub: String!
  rowid: ID!
  username: String!
  permissions: [PermissionDTO]
}
`;
