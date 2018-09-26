export default {
  interfaces: [
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
      index: 0,
      gql: "input ChangeUserStatusArgs {\n  externalId: String!\n}"
    }
  ],
  enums: []
};
