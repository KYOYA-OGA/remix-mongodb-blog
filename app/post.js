import { PrismaClient } from '@prisma/client';
import { marked } from 'marked';

const prisma = new PrismaClient();

export async function getPosts() {
  await prisma.$connect();
  const allPosts = await prisma.posts.findMany();
  prisma.$disconnect();
  // console.log(allPosts);
  return allPosts;
}

export async function getPostBySlug(slug) {
  await prisma.$connect();
  const foundPost = await prisma.posts.findFirst({
    where: {
      slug: slug,
    },
  });
  let title = foundPost.title;
  let html = marked.parse(foundPost.markdown);

  prisma.$disconnect();

  return { slug, title, html };
}

export async function createPost(post) {
  await prisma.$connect();
  await prisma.posts.create({
    data: {
      title: post.title,
      slug: post.slug,
      markdown: post.markdown,
    },
  });
  prisma.$disconnect();
  return getPostBySlug(post.slug);
}

export async function getPostToEdit(slug) {
  await prisma.$connect();
  const foundPost = await prisma.posts.findFirst({
    where: {
      slug: slug,
    },
  });
  let id = foundPost.id;
  let title = foundPost.title;
  let markdown = foundPost.markdown;
  prisma.$disconnect();

  return { id, slug, title, markdown };
}
export async function updatePost(post) {
  await prisma.$connect();

  await prisma.posts.update({
    where: {
      id: post.id,
    },
    data: {
      title: post.title,
      slug: post.slug,
      markdown: post.markdown,
    },
  });
  prisma.$disconnect();
  return getPost(post.slug);
}
