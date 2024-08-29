/**
 * Types for the feed lists.
 *
 * @property lists The array of lists
 * @see {@link List}
 *
 * @example
 * ```ts
 * const lists: Lists = {
 *   lists: []
 * }
 * ```
 */
export type Lists = {
  lists: List[];
};

/**
 * Types for the list of feeds.
 *
 * @property name The name of the list
 * @property feeds The array of feeds
 * @see {@link Feed}
 *
 * @example
 * ```ts
 * const list: List = {
 *   name: "List Name",
 *   feeds: []
 * }
 * ```
 */
export type List = {
  name: string;
  feeds: Feed[];
};

/**
 * Types for the feed.
 *
 * @property title The title of the feed
 * @property [type] The type of the feed
 * @property [id] The id of the feed
 * @property [xmlUrl] The URL of the feed
 *
 * @example Use prepared types
 * ```ts
 * const feed: Feed = {
 *   title: "Feed Title",
 *   type: "bluesky",
 *   id: "username",
 * }
 * ```
 * @example Specify the URL
 * ```ts
 * const feed: Feed = {
 *   title: "Feed Title",
 *   xmlUrl: new URL("https://example.com/feed.xml")
 * }
 * ```
 */
export type Feed = {
  title: string;
  type?: string;
  id?: string;
  xmlUrl?: URL;
};

/**
 * Types for the OPML outline.
 *
 * @property \@title The title of the outline
 * @property \@text The text of the outline
 * @property \@xmlUrl The URL of the outline
 * @property \@type=rss The type of the outline
 *
 * @example
 * ```ts
 * const outline: OPMLOutline = {
 *   "@title": "Outline Title",
 *   "@text": "Outline Text",
 *   "@xmlUrl": new URL("https://example.com/feed.xml"),
 *   "@type": "rss"
 * }
 * ```
 */
export type OPMLOutline = {
  "@title": string;
  "@text": string;
  "@xmlUrl": URL;
  "@type": "rss";
};
