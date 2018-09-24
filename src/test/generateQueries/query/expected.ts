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
            { name: "domain", value: "domainArg" },
            { name: "externalId", value: "externalIdArg" },
            { name: "username", value: "usernameArg" }
          ],
          selections: [
            {
              name: "account",
              arguments: [],
              selections: [
                {
                  name: "name",
                  arguments: [],
                  type: {
                    kind: "Scalar",
                    type: "string",
                    nullable: false
                  }
                },
                {
                  name: "isAdmin",
                  arguments: [],
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
          name: "domainArg",
          type: { kind: "Scalar", type: "string", nullable: false }
        },
        {
          name: "externalIdArg",
          type: { kind: "Scalar", type: "string", nullable: true }
        },
        {
          name: "usernameArg",
          type: { kind: "Scalar", type: "string", nullable: true }
        }
      ]
    }
  ],
  mutations: []
};

export default expected;
