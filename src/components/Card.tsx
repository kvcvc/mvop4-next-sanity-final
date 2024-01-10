import Image from 'next/image';
import Link from 'next/link';

import { urlForImage } from '~/lib/sanity.image';
import { type Post } from '~/lib/sanity.queries';
import { formatDate } from '~/utils';

export default function Card({ post, main }: { post: Post; main?: boolean }) {
  return (
    <div className="p-4">
      <Image
        className="w-full max-h-64 object-cover"
        src={urlForImage(post.mainImage).width(500).height(300).url()}
        height={300}
        width={500}
        alt="Úvodní obrázek"
      />
      <div className="py-2 flex flex-col gap-2">
        <h3 className="text-3xl font-bold hover:underline">
          <Link href={`/post/${post.slug.current}`}>{post.title}</Link>
        </h3>
        <div className="flex gap-2">
          <p className="font-base text-gray-800">
            {post.author} v kategorii {post.category}
          </p>
          <span> - </span>
          <p className="font-base text-gray-800">
            {formatDate(post.createdAt)}
          </p>
        </div>
        {main && <p>{post.excerpt}</p>}
      </div>
    </div>
  );
}
