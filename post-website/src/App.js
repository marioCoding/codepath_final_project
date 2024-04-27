import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import './App.css'; 

const supabaseUrl = 'https://bysbzuzoovdjpxguunvs.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ5c2J6dXpvb3ZkanB4Z3V1bnZzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQyMDE5MDksImV4cCI6MjAyOTc3NzkwOX0.PJ05D8LZcs8MVqbfqj76VGl36noQ0nfZrMh6WaYGepA';
const supabase = createClient(supabaseUrl, supabaseKey);

function App() {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({ title: '', content: '', imageUrl: '' });
  const [sortBy, setSortBy] = useState('createdTime');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    let { data: posts, error } = await supabase.from('posts').select('*');
    if (error) console.log('Error fetching posts:', error.message);
    else setPosts(posts);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data, error } = await supabase.from('posts').insert([newPost]);
      if (error) {
        console.log('Error creating post:', error.message);
      } else if (data) { // Check if data is not null
        setPosts([...posts, data[0]]);
        setNewPost({ title: '', content: '', imageUrl: '' });
      }
    } catch (error) {
      console.log('Error creating post:', error.message);
    }
  };

  const handleSortByChange = (e) => {
    setSortBy(e.target.value);
  };

  const handleSearchTermChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleUpvote = async (postId) => {
    try {
      const { data, error } = await supabase.from('posts').update({ upvotes: supabase.sql('upvotes + 1') }).eq('id', postId);
      if (error) {
        console.log('Error upvoting post:', error.message);
      } else {
        const updatedPosts = posts.map(post => {
          if (post.id === postId) {
            return { ...post, upvotes: post.upvotes + 1 };
          } else {
            return post;
          }
        });
        setPosts(updatedPosts);
      }
    } catch (error) {
      console.log('Error upvoting post:', error.message);
    }
  };

  const handleDelete = async (postId) => {
    try {
      const { error } = await supabase.from('posts').delete().eq('id', postId);
      if (error) {
        console.log('Error deleting post:', error.message);
      } else {
        const updatedPosts = posts.filter(post => post.id !== postId);
        setPosts(updatedPosts);
      }
    } catch (error) {
      console.log('Error deleting post:', error.message);
    }
  };

  const handleEdit = async (postId) => {
    // Implement edit functionality here
  };

  const goToPostPage = (postId) => {
    // Implement navigation to post page here
  };

  const filteredPosts = posts.filter(post => post.title.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="App">
      <h1>My Blog</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Title" value={newPost.title} onChange={(e) => setNewPost({ ...newPost, title: e.target.value })} />
        <input type="text" placeholder="Content" value={newPost.content} onChange={(e) => setNewPost({ ...newPost, content: e.target.value })} />
        <input type="text" placeholder="Image URL" value={newPost.imageUrl} onChange={(e) => setNewPost({ ...newPost, imageUrl: e.target.value })} />
        <button type="submit">Create Post</button>
      </form>
      <div>
        <label>Sort By:</label>
        <select value={sortBy} onChange={handleSortByChange}>
          <option value="createdTime">Created Time</option>
          <option value="upvotes">Upvotes</option>
        </select>
        <input type="text" placeholder="Search by Title" value={searchTerm} onChange={handleSearchTermChange} />
      </div>
      <div>
        {filteredPosts.map(post => (
          <div key={post.id}>
            <h2>{post.title}</h2>
            <p>Created Time: {post.createdTime}</p>
            <p>Upvotes: {post.upvotes}</p>
            <button onClick={() => handleUpvote(post.id)}>Upvote</button>
            <button onClick={() => handleDelete(post.id)}>Delete</button>
            <button onClick={() => handleEdit(post.id)}>Edit</button>
            <button onClick={() => goToPostPage(post.id)}>View Post</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
