import type { GetStaticProps, InferGetStaticPropsType } from 'next';
import { useLiveQuery } from 'next-sanity/preview';

import Card from '~/components/Card';
import Container from '~/components/Container';
import { readToken } from '~/lib/sanity.api';
import { getClient } from '~/lib/sanity.client';
import { getPosts, type Post, postsQuery } from '~/lib/sanity.queries';
import type { SharedPageProps } from '~/pages/_app';

export const getStaticProps: GetStaticProps<
  SharedPageProps & {
    posts: Post[];
  }
> = async ({ draftMode = false }) => {
  const client = getClient(draftMode ? { token: readToken } : undefined);
  const posts = await getPosts(client);

  return {
    props: {
      draftMode,
      token: draftMode ? readToken : '',
      posts,
    },
  };
};

export default function IndexPage(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const [posts] = useLiveQuery<Post[]>(props.posts, postsQuery);
  return (
    <Container>
      <section>
        <Card post={posts[0]} main />
      </section>
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {posts.slice(1).map((post) => (
          <Card key={post.id} post={post} />
        ))}
      </section>
    </Container>
  );
}
