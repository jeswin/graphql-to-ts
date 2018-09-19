export default {
  queries: [
    {
      index: 0,
      name: "User",
      selections: {
        user: {
          account: {
            name: { kind: "Scalar", type: "string", nullable: false },
            isAdmin: { kind: "Scalar", type: "boolean", nullable: false }
          }
        }
      },
      variables: [
        {
          name: "domain",
          type: { kind: "Scalar", type: "string", nullable: false }
        },
        {
          name: "externalId",
          type: { kind: "Scalar", type: "string", nullable: true }
        },
        {
          name: "username",
          type: { kind: "Scalar", type: "string", nullable: true }
        }
      ]
    }
  ],
  mutations: []
};
