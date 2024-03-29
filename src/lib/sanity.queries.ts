import type { PortableTextBlock } from "@portabletext/types";
import type { ImageAsset, Slug } from "@sanity/types";
import groq from "groq";
import { type SanityClient } from "next-sanity";

export const postsQuery = groq`*[_type == "post" && defined(slug.current)]{
  "id": _id,
  "createdAt": _createdAt,
  title,
  slug,
  excerpt,
  category,
  mainImage,
  body,
  "author": author->name
} | order(_createdAt desc)`;

export async function getPosts(client: SanityClient): Promise<Post[]> {
  return await client.fetch(postsQuery);
}

export const postBySlugQuery = groq`*[_type == "post" && slug.current == $slug]{
  "id": _id,
  "createdAt": _createdAt,
  title,
  slug,
  excerpt,
  category,
  mainImage,
  body,
  "author": author->name
}[0]`;

export async function getPost(
  client: SanityClient,
  slug: string,
): Promise<Post> {
  return await client.fetch(postBySlugQuery, {
    slug,
  });
}

export const postSlugsQuery = groq`
*[_type == "post" && defined(slug.current)][].slug.current
`;

export interface Post {
  id: string;
  createdAt: string;
  title?: string;
  slug: Slug;
  excerpt?: string;
  category: string;
  mainImage?: ImageAsset;
  body: PortableTextBlock[];
  author: string;
}
