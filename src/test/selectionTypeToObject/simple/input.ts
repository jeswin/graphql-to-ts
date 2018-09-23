export default [
  {
    name: "hello",
    type: {
      kind: "Scalar",
      type: "IFoo",
      nullable: false
    }
  },
  {
    name: "world",
    selections: [
      {
        name: "inner",
        type: {
          kind: "Scalar",
          type: "IBar",
          nullable: true
        }
      }
    ]
  },
  {
    name: "outer",
    type: {
      kind: "Scalar",
      type: "string",
      nullable: false
    }
  }
];
