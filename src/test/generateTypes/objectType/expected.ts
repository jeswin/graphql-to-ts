export default {
  interfaces: [
    {
      name: "IPermissionDTO",
      graphqlType: "PermissionDTO",
      extension: false,
      fields: [
        {
          name: "resource",
          type: { kind: "Scalar", type: "string", nullable: false }
        },
        {
          name: "allow",
          type: { kind: "Scalar", type: "boolean", nullable: false }
        }
      ],
      index: 0
    },
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
        }
      ],
      index: 1
    }
  ],
  enums: []
};
