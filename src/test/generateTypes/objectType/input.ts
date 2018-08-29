export default `
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