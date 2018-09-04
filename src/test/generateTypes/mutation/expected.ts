export default {
  interfaces: [
    {
      name: "ICreateOrRenameUserArgs",
      extension: false,
      fields: [
        { name: "externalId", nullable: false, type: "string" },
        { name: "pub", nullable: false, type: "string" },
        { name: "username", nullable: false, type: "string" }
      ],
      index: 0
    },
    {
      name: "ICreateOrRenameUserResult",
      extension: false,
      fields: [{ name: "status", nullable: false, type: "string" }],
      index: 1
    },
    {
      name: "IChangeUserStatusArgs",
      extension: false,
      fields: [{ name: "externalId", nullable: false, type: "string" }],
      index: 2
    },
    {
      name: "IChangeUserStatusResult",
      extension: false,
      fields: [{ name: "username", nullable: false, type: "string" }],
      index: 3
    },
    {
      name: "IMutation",
      extension: true,
      fields: [
        {
          arguments: [
            {
              name: "input",
              nullable: true,
              type: "ICreateOrRenameUserArgs | null"
            }
          ],
          name: "createOrRenameUser",
          nullable: false,
          type: "ICreateOrRenameUserResult"
        },
        {
          arguments: [
            {
              name: "input",
              nullable: true,
              type: "IChangeUserStatusArgs | null"
            }
          ],
          name: "enableUser",
          nullable: false,
          type: "IChangeUserStatusResult"
        },
        {
          arguments: [
            {
              name: "input",
              nullable: true,
              type: "IChangeUserStatusArgs | null"
            }
          ],
          name: "disableUser",
          nullable: false,
          type: "IChangeUserStatusResult"
        },
        {
          arguments: [
            {
              name: "input",
              nullable: true,
              type: "IChangeUserStatusArgs | null"
            }
          ],
          name: "destroyUser",
          nullable: false,
          type: "IChangeUserStatusResult"
        }
      ],
      index: 4
    }
  ],
  enums: []
};
