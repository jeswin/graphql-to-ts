import { ITSQueries } from "../../../types";

const expected: ITSQueries = {
  queries: [
    {
      index: 0,
      name: "User",
      selections: [
        {
          name: "user",
          arguments: [
            { name: "domainArg", value: "domain" },
            { name: "externalIdArg", value: "externalId" },
            { name: "usernameArg", value: "username" }
          ],
          selections: [
            {
              name: "account",
              arguments: [],
              selections: [
                {
                  name: "name",
                  type: {
                    kind: "Scalar",
                    type: "string",
                    nullable: false
                  }
                },
                {
                  name: "isAdmin",
                  type: {
                    kind: "Scalar",
                    type: "boolean",
                    nullable: false
                  }
                }
              ]
            }
          ]
        }
      ],
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

export default expected;
