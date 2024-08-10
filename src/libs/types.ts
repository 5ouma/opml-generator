export type Lists = {
  lists: List[];
};

export type List = {
  name: string;
  feeds: Feed[];
};

export type Feed = {
  title: string;
  type?: string;
  id?: string;
  xmlUrl?: URL;
};

export type OPMLOutline = {
  "@title": string;
  "@text": string;
  "@xmlUrl": URL;
  "@type": "rss";
};
