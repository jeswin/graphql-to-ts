export default `
export interface ILocation {
  id?: string | null;
  name?: string | null;
}

export interface IHotel {
  name?: string | null;
  location?: ILocation | null;
}
`;
