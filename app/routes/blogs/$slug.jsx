import { marked } from 'marked';
import { useLoaderData } from 'remix';
import invariant from 'tiny-invariant';
import { getPostBySlug } from '~/post';

export let loader = async ({ params }) => {
  invariant(params.slug, 'expected params.slug');
  return getPostBySlug(params.slug);
};

export default function PostSlug() {
  let post = useLoaderData();

  return (
    <div
      className="postDisplay"
      dangerouslySetInnerHTML={{ __html: post.html }}
    />
  );
}
