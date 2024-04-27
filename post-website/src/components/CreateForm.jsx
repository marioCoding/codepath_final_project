import React, { useState } from 'react';
import { supabase } from './supabase'; // Import Supabase client

const CreateForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data, error } = await supabase
        .from('posts')
        .insert({ title, content, imageUrl })
        .single();
      if (error) {
        throw error;
      }
      console.log('Post created:', data);
      // Reset form fields
      setTitle('');
      setContent('');
      setImageUrl('');
    } catch (error) {
      console.error('Error creating post:', error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
      <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="Content" />
      <input type="text" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} placeholder="Image URL" />
      <button type="submit">Create Post</button>
    </form>
  );
};

export default CreateForm;