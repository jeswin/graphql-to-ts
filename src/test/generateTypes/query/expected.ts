export default {
  interfaces: [
    {
      name: "IScuttlespaceUserDTO",
      graphqlType: "ScuttlespaceUserDTO",
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
        }
      ],
      index: 0
    },
    {
      name: "IPermissionDTO",
      graphqlType: "PermissionDTO",
      extension: false,
      fields: [
        {
          name: "rowid",
          type: { kind: "Scalar", type: "string", nullable: false }
        },
        {
          name: "assigner",
          type: {
            kind: "Scalar",
            type: "IScuttlespaceUserDTO",
            nullable: false
          }
        },
        {
          name: "assignee",
          type: {
            kind: "Scalar",
            type: "IScuttlespaceUserDTO",
            nullable: false
          }
        },
        {
          name: "permissions",
          type: { kind: "Scalar", type: "string", nullable: true }
        }
      ],
      index: 1
    },
    {
      name: "IQuery",
      graphqlType: "Query",
      extension: true,
      fields: [
        {
          arguments: [
            {
              name: "domain",
              type: { kind: "Scalar", type: "string", nullable: true }
            },
            {
              name: "externalId",
              type: { kind: "Scalar", type: "string", nullable: true }
            },
            {
              name: "username",
              type: { kind: "Scalar", type: "string", nullable: true }
            }
          ],
          name: "user",
          type: { kind: "Scalar", type: "IScuttlespaceUserDTO", nullable: true }
        }
      ],
      index: 2
    }
  ],
  enums: []
};
