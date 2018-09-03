export default {
  interfaces: [
    {
      name: "ICreateOrRenameUserArgs",
      extension: false,
      fields: [
        { name: "externalId", type: "string" },
        { name: "pub", type: "string" },
        { name: "username", type: "string" }
      ],
      index: 0
    },
    {
      name: "ICreateOrRenameUserResult",
      extension: false,
      fields: [{ name: "status", type: "string" }],
      index: 1
    },
    {
      name: "IChangeUserStatusArgs",
      extension: false,
      fields: [{ name: "externalId", type: "string" }],
      index: 2
    },
    {
      name: "IChangeUserStatusResult",
      extension: false,
      fields: [{ name: "username", type: "string" }],
      index: 3
    },
    {
      name: "IMutation",
      extension: true,
      fields: [
        {
          arguments: [
            { name: "input?", type: "ICreateOrRenameUserArgs | null" }
          ],
          name: "createOrRenameUser",
          type: "ICreateOrRenameUserResult"
        },
        {
          arguments: [{ name: "input?", type: "IChangeUserStatusArgs | null" }],
          name: "enableUser",
          type: "IChangeUserStatusResult"
        },
        {
          arguments: [{ name: "input?", type: "IChangeUserStatusArgs | null" }],
          name: "disableUser",
          type: "IChangeUserStatusResult"
        },
        {
          arguments: [{ name: "input?", type: "IChangeUserStatusArgs | null" }],
          name: "destroyUser",
          type: "IChangeUserStatusResult"
        }
      ],
      index: 4
    }
  ],
  enums: []
};
