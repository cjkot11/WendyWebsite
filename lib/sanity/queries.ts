// GROQ queries for Sanity
export const postsQuery = `*[_type == "post" && !(_id in path("drafts.**")) && defined(publishedAt)] | order(publishedAt desc) {
  _id,
  title,
  slug,
  author,
  publishedAt,
  excerpt,
  mainImage,
  categories
}`;

export const postBySlugQuery = `*[_type == "post" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  author,
  publishedAt,
  excerpt,
  mainImage,
  categories,
  body
}`;

export const postSlugsQuery = `*[_type == "post" && defined(slug.current)][] {
  "slug": slug.current
}`;
