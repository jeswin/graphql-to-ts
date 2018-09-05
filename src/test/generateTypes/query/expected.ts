export default {
  interfaces: [
    {
      name: "IScuttlespaceUserDTO",
      graphqlType: "ScuttlespaceUserDTO",
      extension: false,
      fields: [
        { name: "about", nullable: true, type: "string | undefined" },
        { name: "domain", nullable: true, type: "string | undefined" },
        { name: "enabled", nullable: false, type: "boolean" },
        { name: "externalId", nullable: false, type: "string" },
        { name: "pub", nullable: false, type: "string" },
        { name: "rowid", nullable: false, type: "string" },
        { name: "username", nullable: false, type: "string" },
        {
          name: "permissions",
          nullable: true,
          type: "[IPermissionDTO | undefined] | undefined"
        }
      ],
      index: 0
    },
    {
      name: "IPermissionDTO",
      graphqlType: "PermissionDTO",
      extension: false,
      fields: [
        { name: "rowid", nullable: false, type: "string" },
        {
          name: "assigner",
          nullable: false,
          type: "IScuttlespaceUserDTO"
        },
        {
          name: "assignee",
          nullable: false,
          type: "IScuttlespaceUserDTO"
        },
        { name: "permissions", nullable: true, type: "string | undefined" }
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
            { name: "domain", nullable: true, type: "string | undefined" },
            { name: "externalId", nullable: true, type: "string | undefined" },
            { name: "username", nullable: true, type: "string | undefined" }
          ],
          nullable: true,
          name: "user",
          type: "IScuttlespaceUserDTO | undefined"
        }
      ],
      index: 2
    }
  ],
  enums: []
};
