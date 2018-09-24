import { ITSQueries } from "../../../types";

const expected: ITSQueries = {
  queries: [],
  mutations: [
    {
      index: 0,
      name: "AddUser",
      selections: [
        {
          name: "addUser",
          arguments: [
            { name: "name", value: "nameArg" },
            { name: "location", value: "locationArg" }
          ],
          type: {
            kind: "Scalar",
            nullable: false,
            type: "boolean"
          }
        }
      ],
      variables: [
        {
          name: "nameArg",
          type: { kind: "Scalar", type: "string", nullable: true }
        },
        {
          name: "locationArg",
          type: { kind: "Scalar", type: "string", nullable: false }
        }
      ]
    }
  ]
};

export default expected;
