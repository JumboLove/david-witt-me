import { groq } from "astro-sanity";

interface Filter {
  title: string;
  query: string;
}

export const filters: Map<string, Filter> = new Map();

filters.set("books", {
  title: "Books",
  query: groq`*[count((tags[]->slug.current)[@ in ["nonfiction", "fiction"]]) > 0 && _type == "resource" && isVisible == true]`,
});

filters.set("webdev", {
  title: "Web Dev",
  query: groq`*[count((tags[]->slug.current)[@ in ["typescript", "tailwind", "astro", "sanity", "react", "remix", "commerce-cloud", "web-dev-toolbox"]]) > 0 && _type == "resource" && isVisible == true]`,
});
