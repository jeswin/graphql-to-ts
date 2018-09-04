export default {
  interfaces: [
    {
      name: "ILocation",
      extension: false,
      fields: [
        { name: "id", nullable: true, type: "string | null" },
        { name: "name", nullable: true, type: "string | null" }
      ],
      index: 0
    },
    {
      name: "IHotel",
      extension: false,
      fields: [
        { name: "name", nullable: true, type: "string | null" },
        { name: "location", nullable: true, type: "ILocation | null" }
      ],
      index: 1
    }
  ],
  enums: []
};
