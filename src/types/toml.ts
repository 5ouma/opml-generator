export type Lists = {
  lists: List[];
};
export type List = {
  name: string;
  feeds: Feed[];
};
export type Feed = {
  title: string;
  xmlUrl: URL;
};
