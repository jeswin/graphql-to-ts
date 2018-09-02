export default {
  interfaces: [
    {
      name: "IScuttlespaceUser",
      fields: [
        { name: "about?", type: "string | null" },
        { name: "domain?", type: "string | null" },
        { name: "enabled", type: "boolean" },
        { name: "externalId", type: "string" },
        { name: "pub", type: "string" },
        { name: "rowid", type: "string" },
        { name: "username", type: "string" },
        { name: "permissions?", type: "[IPermissionDTO | null] | null" }
      ],
      index: 0
    },
    {
      fields: [
        {
          arguments: [
            {
              name: "id?",
              type: "string | null"
            }
          ],
          name: "user",
          type: "string"
        }
      ],
      index: 1,
      name: "IQuery"
    }
  ],
  enums: []
};
