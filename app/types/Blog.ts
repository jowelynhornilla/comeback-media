export interface Blog {
  slug: string;
  title: string;
  subtitle: string;
  author: Author;
  featuredImage: FeaturedImage;
  body: Body[];
  conclusion: string;
  nextBlog?: { slug: string; title: string };
}

export interface Author {
  name: string;
  role: string;
  avatar: FeaturedImage;
}

export interface FeaturedImage {
  url: string;
}

export interface P {
  type: "p";
  content: string;
}

export interface Divider {
  type: "divider";
}
export interface H2 {
  type: "h2";
  content: string;
}

export interface H3 {
  type: "h3";
  content: string;
}

export interface Img {
  type: "img";
  url: string;
  width: number;
  height: number;
  caption?: string;
}

export interface Quote {
  type: "quote";
  content: string;
  author?: string;
}

export type Body = P | Divider | H2 | Img | Quote | H3;

export type BlogBodyKeys = "p" | "divider" | "h2" | "img" | "quote" | "h3";
