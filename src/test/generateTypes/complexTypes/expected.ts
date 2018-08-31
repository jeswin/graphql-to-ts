export default {
  interfaces: [
    {
      name: "ILocation",
      fields: [
        { name: "id?", type: "string | null" },
        { name: "name?", type: "string | null" }
      ],
      index: 0
    },
    {
      name: "IHotel",
      fields: [
        { name: "name?", type: "string | null" },
        { name: "location?", type: "ILocation | null" }
      ],
      index: 1
    }
  ],
  enums: []
};
