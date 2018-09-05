export default {
  interfaces: [
    {
      name: "ILocation",
      graphqlType: "Location",
      extension: false,
      fields: [
        { name: "id", nullable: true, type: "string | undefined" },
        { name: "name", nullable: true, type: "string | undefined" }
      ],
      index: 0
    },
    {
      name: "IHotel",
      graphqlType: "Hotel",
      extension: false,
      fields: [
        { name: "name", nullable: true, type: "string | undefined" },
        { name: "location", nullable: true, type: "ILocation | undefined" }
      ],
      index: 1
    }
  ],
  enums: []
};
