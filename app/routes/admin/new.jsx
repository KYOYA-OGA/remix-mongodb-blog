import { redirect, Form, useActionData, useTransition } from 'remix';
import { createPost } from '~/post';

export let action = async ({ request }) => {
  let formData = await request.formData();
  let title = formData.get('title');
  let slug = formData.get('slug');
  let markdown = formData.get('markdown');

  let errors = {};
  if (!title) errors.title = true;
  if (!slug) errors.slug = true;
  if (!markdown) errors.markdown = true;

  if (Object.keys(errors).length) {
    return errors;
  }

  await createPost({ title, slug, markdown });

  return redirect('/admin');
};

export default function NewPost() {
  let errors = useActionData();
  let transition = useTransition();
  let slug = '';

  // タイトルからスラッグを自動入力
  const handleChange = (e) => {
    let text = e.target.value;
    // スペースをダッシュに変換
    slug = text.replace(/\s/g, '-');
    // 小文字に変換
    document.getElementById('slugInput').value = slug.toLowerCase();
  };
  return (
    <Form method="post">
      <p>
        <label htmlFor="">
          Post Title: {errors?.title && <em>Title is required</em>}{' '}
          <input onChange={handleChange} type="text" name="title" />
        </label>
      </p>
      <p>
        <label htmlFor="">
          {' '}
          Post Slug: {errors?.slug && <em>Slug is required</em>}
          <input placeholder={slug} id="slugInput" type="text" name="slug" />
        </label>
      </p>
      <p>
        <label htmlFor="markdown">Markdown:</label>{' '}
        {errors?.markdown && <em>Markdown is required</em>}
        <br />
        <textarea name="markdown" id="" rows={20} cols={30} />
      </p>
      <p>
        <button type="submit">
          {transition.submission ? 'Creating...' : 'Create Post'}
        </button>
      </p>
    </Form>
  );
}
