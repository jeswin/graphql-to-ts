export default {
  interfaces: [
    {
      extension: false,
      fields: [
        {
          name: "resource",
          nullable: false,
          type: "string"
        },
        {
          name: "allow",
          nullable: false,
          type: "boolean"
        }
      ],
      graphqlType: "PermissionDTO",
      index: 0,
      name: "IPermissionDTO"
    },
    {
      name: "IScuttlespaceUser",
      graphqlType: "ScuttlespaceUser",
      extension: false,
      fields: [
        { name: "about", nullable: true, type: "string | null" },
        { name: "domain", nullable: true, type: "string | null" },
        { name: "enabled", nullable: false, type: "boolean" },
        { name: "externalId", nullable: false, type: "string" },
        { name: "pub", nullable: false, type: "string" },
        { name: "rowid", nullable: false, type: "string" },
        { name: "username", nullable: false, type: "string" },
        {
          name: "permissions",
          nullable: true,
          type: "[IPermissionDTO | null] | null"
        }
      ],
      index: 1
    }
  ],
  enums: []
};
