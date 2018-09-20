export default {
  hello: {
    kind: "Scalar",
    type: "IFoo",
    nullable: false
  },
  world: {
    inner: {
      kind: "Scalar",
      type: "IBar",
      nullable: true
    }
  },
  outer: {
    kind: "Scalar",
    type: "string",
    nullable: false
  }
};
