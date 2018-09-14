export default {
  queries: [
    {
      name: "IUser",
      variables: [
        { name: "domain", type: "string" },
        { name: "externalId", type: "string" },
        { name: "username", type: "string" }
      ]
    }
  ],
  mutations: []
};
