export default {
  interfaces: [
    {
      name: "IScuttlespaceUserDTO",
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
      index: 0
    },
    {
      name: "IPermissionDTO",
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
        { name: "permissions", nullable: true, type: "string | null" }
      ],
      index: 1
    },
    {
      name: "IQuery",
      extension: true,
      fields: [
        {
          arguments: [
            { name: "domain", nullable: true, type: "string | null" },
            { name: "externalId", nullable: true, type: "string | null" },
            { name: "username", nullable: true, type: "string | null" }
          ],
          nullable: true,
          name: "user",
          type: "IScuttlespaceUserDTO | null"
        }
      ],
      index: 2
    }
  ],
  enums: []
};
