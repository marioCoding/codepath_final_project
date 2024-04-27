import React, { useEffect, useState } from 'react';
import { supabase } from './supabase'; // Import Supabase client

const HomeFeed = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data, error } = await supabase.from('posts').select('*');
        if (error) {
          throw error;
        }
        setPosts(data);
      } catch (error) {
        console.error('Error fetching posts:', error.message);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div>
      <h1>Home Feed</h1>
      {posts.map(post => (
        <div key={post.id}>
          <h2>{post.title}</h2>
          <p>Created at: {post.created_at}</p>
          <p>Upvotes: {post.upvotes}</p>
          {/* Add upvote button and other basic info */}
        </div>
      ))}
    </div>
  );
};

export default HomeFeed;