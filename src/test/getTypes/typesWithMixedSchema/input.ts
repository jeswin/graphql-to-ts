export default `
enum Status {
  Active,
  Disabled
}

type ScuttlespaceUser {
  about: String
  domain: String
  enabled: Boolean!
  externalId: String!
  pub: String!
  rowid: ID!
  username: String!
  permissions: [PermissionDTO],
  status: Status
}

extend type Query {
  user(id: String): String!
}
`;
