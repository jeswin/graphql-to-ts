export default {
  interfaces: [
    {
      name: "ICreateOrRenameUserArgs",
      fields: [
        { name: "externalId", type: "string" },
        { name: "pub", type: "string" },
        { name: "username", type: "string" }
      ],
      index: 0
    },
    {
      name: "ICreateOrRenameUserResult",
      fields: [{ name: "status", type: "string" }],
      index: 1
    },
    {
      name: "IChangeUserStatusArgs",
      fields: [{ name: "externalId", type: "string" }],
      index: 2
    },
    {
      name: "IChangeUserStatusResult",
      fields: [{ name: "username", type: "string" }],
      index: 3
    },
    {
      name: "IMutation",
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
