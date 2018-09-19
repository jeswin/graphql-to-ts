export default {
  interfaces: [
    {
      name: "ILocation",
      graphqlType: "Location",
      extension: false,
      fields: [
        {
          name: "id",
          type: { kind: "Scalar", type: "string", nullable: true }
        },
        {
          name: "name",
          type: { kind: "Scalar", type: "string", nullable: true }
        }
      ],
      index: 0
    },
    {
      name: "IHotel",
      graphqlType: "Hotel",
      extension: false,
      fields: [
        {
          name: "name",
          type: { kind: "Scalar", type: "string", nullable: true }
        },
        {
          name: "location",
          type: { kind: "Scalar", type: "ILocation", nullable: true }
        }
      ],
      index: 1
    }
  ],
  enums: []
};
