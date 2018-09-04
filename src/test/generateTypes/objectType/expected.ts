export default {
  interfaces: [
    {
      name: "IScuttlespaceUser",
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
    }
  ],
  enums: []
};
