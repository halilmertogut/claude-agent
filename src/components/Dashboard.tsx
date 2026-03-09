import React, { useState, useEffect } from "react";
import { Icon } from "lucide-react";

// Poorly written component — waterfall fetching, barrel imports, no Suspense
export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const userData = await fetch("/api/user").then((r) => r.json());
      setUser(userData);

      const postsData = await fetch("/api/posts").then((r) => r.json());
      setPosts(postsData);

      const commentsData = await fetch("/api/comments").then((r) => r.json());
      setComments(commentsData);

      setLoading(false);
    }
    loadData();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1>Welcome {user?.name}</h1>
      <div>
        {posts.map((post: any) => (
          <div key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.body}</p>
          </div>
        ))}
      </div>
      <div>
        {comments.map((comment: any) => (
          <div key={comment.id}>
            <p>{comment.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
