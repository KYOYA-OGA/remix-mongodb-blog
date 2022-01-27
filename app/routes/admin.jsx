import { Link, Outlet, useLoaderData } from 'remix';
import { getPosts } from '~/post';

export let loader = () => {
  return getPosts();
};

export default function Admin() {
  const posts = useLoaderData();
  return (
    <div className="admin">
      <h1 className="adminTitle">Admin</h1>
      <nav>
        <p>Click on a post to edit the blog post</p>
        <ul>
          {posts.map((post) => (
            <li key={post.slug}>
              <Link to={post.slug}>{post.title}</Link>
            </li>
          ))}
        </ul>
        <main>
          {/* Outlet renders the /admin/index.jsx */}
          <Outlet />
        </main>
      </nav>
    </div>
  );
}
