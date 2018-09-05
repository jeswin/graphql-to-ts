export default {
  enums: [
    {
      graphqlType: "Status",
      index: 0,
      name: "Status",
      values: ["Active", "Disabled"]
    }
  ],
  interfaces: [
    {
      name: "IScuttlespaceUser",
      graphqlType: "ScuttlespaceUser",
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
          type: "(IPermissionDTO | undefined)[] | undefined"
        },
        {
          name: "status",
          nullable: true,
          type: "Status | undefined"
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
              name: "id",
              nullable: true,
              type: "string | undefined"
            }
          ],
          name: "user",
          nullable: false,
          type: "string"
        }
      ],
      index: 2
    }
  ]
};
