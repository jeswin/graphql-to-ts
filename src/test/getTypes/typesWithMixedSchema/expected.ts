export default {
  interfaces: [
    {
      name: "IScuttlespaceUser",
      graphqlType: "ScuttlespaceUser",
      extension: false,
      fields: [
        {
          name: "about",
          type: { kind: "Scalar", type: "string", nullable: true }
        },
        {
          name: "domain",
          type: { kind: "Scalar", type: "string", nullable: true }
        },
        {
          name: "enabled",
          type: { kind: "Scalar", type: "boolean", nullable: false }
        },
        {
          name: "externalId",
          type: { kind: "Scalar", type: "string", nullable: false }
        },
        {
          name: "pub",
          type: { kind: "Scalar", type: "string", nullable: false }
        },
        {
          name: "rowid",
          type: { kind: "Scalar", type: "string", nullable: false }
        },
        {
          name: "username",
          type: { kind: "Scalar", type: "string", nullable: false }
        },
        {
          name: "permissions",
          type: {
            kind: "List",
            type: { kind: "Scalar", type: "IPermissionDTO", nullable: true },
            nullable: true
          }
        },
        {
          name: "status",
          type: { kind: "Scalar", type: "Status", nullable: true }
        }
      ],
      index: 1,
      gql:
        "type ScuttlespaceUser {\n  about: String\n  domain: String\n  enabled: Boolean!\n  externalId: String!\n  pub: String!\n  rowid: ID!\n  username: String!\n  permissions: [PermissionDTO]\n  status: Status\n}"
    },
    {
      name: "IQuery",
      graphqlType: "Query",
      extension: true,
      fields: [
        {
          arguments: [
            {
              name: "id",
              type: { kind: "Scalar", type: "string", nullable: true }
            }
          ],
          name: "user",
          type: { kind: "Scalar", type: "string", nullable: false }
        }
      ],
      index: 2,
      gql: "extend type Query {\n  user(id: String): String!\n}"
    }
  ],
  enums: [
    {
      name: "Status",
      graphqlType: "Status",
      values: ["Active", "Disabled"],
      index: 0,
      gql: "enum Status {\n  Active\n  Disabled\n}"
    }
  ]
};
