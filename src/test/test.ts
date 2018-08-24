import "mocha";
import "should";

describe("graphql-to-ts", () => {
  it(`generates types`, () => {
    const input = [
      {
        fields: [
          ["about", "String"],
          ["domain", "String"],
          ["enabled", "Boolean!"],
          ["externalId", "String!"],
          ["pub", "String!"],
          ["rowid", "ID!"],
          ["username", "String!"],
          ["permissions", "[PermissionDTO]"]
        ],
        name: "ScuttlespaceUserDTO",
        type: "type"
      },
      {
        fields: [
          ["rowid", "ID!"],
          ["assigner", "ScuttlespaceUserDTO!"],
          ["assignee", "ScuttlespaceUserDTO!"],
          ["permissions", "String"]
        ],
        name: "PermissionDTO",
        type: "type"
      },
      {
        name: "UserStatusEnum",
        type: "enum",
        values: ["AVAILABLE", "TAKEN", "OWN"]
      },
      {
        fields: [
          ["externalId", "String!"],
          ["pub", "String!"],
          ["username", "String!"]
        ],
        name: "CreateOrRenameUserArgs",
        type: "input"
      },
      {
        fields: [["status", "String"]],
        name: "CreateOrRenameUserResult",
        type: "type"
      },
      {
        fields: [["externalId", "String"]],
        name: "ChangeUserStatusArgs",
        type: "type"
      },
      {
        fields: [["username", "String"]],
        name: "ChangeUserStatusResult",
        type: "type"
      }
    ];
  });
});
