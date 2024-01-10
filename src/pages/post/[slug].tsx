import { PortableText } from '@portabletext/react';
import type { GetStaticProps, InferGetStaticPropsType } from 'next';
import Image from 'next/image';
import { useLiveQuery } from 'next-sanity/preview';

import Container from '~/components/Container';
import { readToken } from '~/lib/sanity.api';
import { getClient } from '~/lib/sanity.client';
import { urlForImage } from '~/lib/sanity.image';
import {
  getPost,
  type Post,
  postBySlugQuery,
  postSlugsQuery,
} from '~/lib/sanity.queries';
import type { SharedPageProps } from '~/pages/_app';
import { formatDate } from '~/utils';
import Box from '~/components/Box';

interface Query {
  [key: string]: string;
}

export const getStaticProps: GetStaticProps<
  SharedPageProps & {
    post: Post;
  },
  Query
> = async ({ draftMode = false, params = {} }) => {
  const client = getClient(draftMode ? { token: readToken } : undefined);
  const post = await getPost(client, params.slug);

  if (!post) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      draftMode,
      token: draftMode ? readToken : null,
      post,
    },
  };
};

export default function ProjectSlugRoute(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const [post] = useLiveQuery(props.post, postBySlugQuery, {
    slug: props.post.slug.current,
  });

  return (
    <Container>
      <section className="p-4">
        <div className="grid md:grid-cols-2 gap-4">
          <Image
            src={urlForImage(post.mainImage).url()}
            height={231}
            width={367}
            alt={post.title}
            className="w-full max-h-96 object-cover"
          />
          <div className="flex flex-col gap-2">
            <h1 className="text-6xl font-bold">{post.title}</h1>
            <div className="flex gap-2">
              <p className="font-base text-gray-800">
                {post.author} v kategorii {post.category}
              </p>
              <span> - </span>
              <p className="font-base text-gray-800">
                {formatDate(post.createdAt)}
              </p>
            </div>
            <p>{post.excerpt}</p>
          </div>
        </div>
        <div className="portable-text">
          <PortableText value={post.body} components={{ marks: { Box } }} />
        </div>
      </section>
    </Container>
  );
}

export const getStaticPaths = async () => {
  const client = getClient();
  const slugs = await client.fetch(postSlugsQuery);

  return {
    paths: slugs?.map(({ slug }) => `/post/${slug}`) || [],
    fallback: 'blocking',
  };
};
