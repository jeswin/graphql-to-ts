export default {
  interfaces: [
    {
      name: "ICreateOrRenameUserArgs",
      graphqlType: "CreateOrRenameUserArgs",
      extension: false,
      fields: [
        {
          name: "externalId",
          type: { kind: "Scalar", type: "string", nullable: false }
        },
        {
          name: "pub",
          type: { kind: "Scalar", type: "string", nullable: false }
        },
        {
          name: "username",
          type: { kind: "Scalar", type: "string", nullable: false }
        }
      ],
      index: 0
    },
    {
      name: "ICreateOrRenameUserResult",
      graphqlType: "CreateOrRenameUserResult",
      extension: false,
      fields: [
        {
          name: "status",
          type: { kind: "Scalar", type: "string", nullable: false }
        }
      ],
      index: 1
    },
    {
      name: "IChangeUserStatusArgs",
      graphqlType: "ChangeUserStatusArgs",
      extension: false,
      fields: [
        {
          name: "externalId",
          type: { kind: "Scalar", type: "string", nullable: false }
        }
      ],
      index: 2
    },
    {
      name: "IChangeUserStatusResult",
      graphqlType: "ChangeUserStatusResult",
      extension: false,
      fields: [
        {
          name: "username",
          type: { kind: "Scalar", type: "string", nullable: false }
        }
      ],
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
              type: {
                kind: "Scalar",
                type: "ICreateOrRenameUserArgs",
                nullable: true
              }
            }
          ],
          name: "createOrRenameUser",
          type: {
            kind: "Scalar",
            type: "ICreateOrRenameUserResult",
            nullable: false
          }
        },
        {
          arguments: [
            {
              name: "input",
              type: {
                kind: "Scalar",
                type: "IChangeUserStatusArgs",
                nullable: true
              }
            }
          ],
          name: "enableUser",
          type: {
            kind: "Scalar",
            type: "IChangeUserStatusResult",
            nullable: false
          }
        },
        {
          arguments: [
            {
              name: "input",
              type: {
                kind: "Scalar",
                type: "IChangeUserStatusArgs",
                nullable: true
              }
            }
          ],
          name: "disableUser",
          type: {
            kind: "Scalar",
            type: "IChangeUserStatusResult",
            nullable: false
          }
        },
        {
          arguments: [
            {
              name: "input",
              type: {
                kind: "Scalar",
                type: "IChangeUserStatusArgs",
                nullable: true
              }
            }
          ],
          name: "destroyUser",
          type: {
            kind: "Scalar",
            type: "IChangeUserStatusResult",
            nullable: false
          }
        }
      ],
      index: 4
    }
  ],
  enums: []
};
