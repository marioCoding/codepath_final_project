import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from './supabase'; // Import Supabase client

const PostPage = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const { data, error } = await supabase.from('posts').select('*').eq('id', postId).single();
        if (error) {
          throw error;
        }
        setPost(data);
      } catch (error) {
        console.error('Error fetching post:', error.message);
      }
    };
    fetchPost();
  }, [postId]);

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{post.title}</h1>
      <p>Created at: {post.created_at}</p>
      <p>{post.content}</p>
      {post.imageUrl && <img src={post.imageUrl} alt="Post" />}
      {/* Add comments section and upvote button */}
    </div>
  );
};

export default PostPage;