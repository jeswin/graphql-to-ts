export default {
  interfaces: [
    {
      name: "ICreateOrRenameUserArgs",
      graphqlType: "CreateOrRenameUserArgs",
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
      graphqlType: "CreateOrRenameUserResult",
      extension: false,
      fields: [{ name: "status", nullable: false, type: "string" }],
      index: 1
    },
    {
      name: "IChangeUserStatusArgs",
      graphqlType: "ChangeUserStatusArgs",
      extension: false,
      fields: [{ name: "externalId", nullable: false, type: "string" }],
      index: 2
    },
    {
      name: "IChangeUserStatusResult",
      graphqlType: "ChangeUserStatusResult",
      extension: false,
      fields: [{ name: "username", nullable: false, type: "string" }],
      index: 3
    },
    {
      name: "IMutation",
      graphqlType: "Mutation",
      extension: true,
      fields: [
        {
          arguments: [
            {
              name: "input",
              nullable: true,
              type: "ICreateOrRenameUserArgs | undefined"
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
              type: "IChangeUserStatusArgs | undefined"
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
              type: "IChangeUserStatusArgs | undefined"
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
              type: "IChangeUserStatusArgs | undefined"
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
