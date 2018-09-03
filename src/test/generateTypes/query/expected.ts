export default {
  interfaces: [
    {
      name: "IScuttlespaceUserDTO",
      extension: false,
      fields: [
        { name: "about?", type: "string | null" },
        { name: "domain?", type: "string | null" },
        { name: "enabled", type: "boolean" },
        { name: "externalId", type: "string" },
        { name: "pub", type: "string" },
        { name: "rowid", type: "string" },
        { name: "username", type: "string" },
        {
          name: "permissions?",
          type: "[IPermissionDTO | null] | null"
        }
      ],
      index: 0
    },
    {
      name: "IPermissionDTO",
      extension: false,
      fields: [
        { name: "rowid", type: "string" },
        {
          name: "assigner",
          type: "IScuttlespaceUserDTO"
        },
        {
          name: "assignee",
          type: "IScuttlespaceUserDTO"
        },
        { name: "permissions?", type: "string | null" }
      ],
      index: 1
    },
    {
      name: "IQuery",
      extension: true,
      fields: [
        {
          arguments: [
            { name: "domain?", type: "string | null" },
            { name: "externalId?", type: "string | null" },
            { name: "username?", type: "string | null" }
          ],
          name: "user?",
          type: "IScuttlespaceUserDTO | null"
        }
      ],
      index: 2
    }
  ],
  enums: []
};
