import { Suspense } from "react";

interface User {
  id: number;
  name: string;
  email: string;
}

interface Post {
  id: number;
  title: string;
  body: string;
}

interface Comment {
  id: number;
  text: string;
  postId: number;
}

async function fetchUser(): Promise<User> {
  const res = await fetch("/api/user");
  if (!res.ok) throw new Error("Failed to fetch user");
  return res.json() as Promise<User>;
}

async function fetchPosts(): Promise<Post[]> {
  const res = await fetch("/api/posts");
  if (!res.ok) throw new Error("Failed to fetch posts");
  return res.json() as Promise<Post[]>;
}

async function fetchComments(): Promise<Comment[]> {
  const res = await fetch("/api/comments");
  if (!res.ok) throw new Error("Failed to fetch comments");
  return res.json() as Promise<Comment[]>;
}

async function DashboardContent(): Promise<JSX.Element> {
  const [user, posts, comments] = await Promise.all([
    fetchUser(),
    fetchPosts(),
    fetchComments(),
  ]);

  return (
    <div>
      <h1>Welcome {user.name}</h1>
      <div>
        {posts.map((post) => (
          <div key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.body}</p>
          </div>
        ))}
      </div>
      <div>
        {comments.map((comment) => (
          <div key={comment.id}>
            <p>{comment.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function DashboardSkeleton(): JSX.Element {
  return (
    <div>
      <div>Loading dashboard...</div>
    </div>
  );
}

export function Dashboard(): JSX.Element {
  return (
    <Suspense fallback={<DashboardSkeleton />}>
      <DashboardContent />
    </Suspense>
  );
}
