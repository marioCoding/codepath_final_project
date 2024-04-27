
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CreateForm from './components/CreateForm';
import HomeFeed from './components/HomeFeed';
import PostPage from './components/PostPage';
//import EditDeletePost from './EditDeletePost';
import { createClient } from '@supabase/supabase-js';

// Replace 'YOUR_SUPABASE_URL' and 'YOUR_SUPABASE_KEY' with your actual Supabase URL and API key
const supabaseUrl = 'https://bysbzuzoovdjpxguunvs.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ5c2J6dXpvb3ZkanB4Z3V1bnZzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQyMDE5MDksImV4cCI6MjAyOTc3NzkwOX0.PJ05D8LZcs8MVqbfqj76VGl36noQ0nfZrMh6WaYGepA';

// Create a Supabase client instance
export const supabase = createClient(supabaseUrl, supabaseKey);

function App() {
  useEffect(() => {
    // Example: Fetch data from a table named 'posts'
    const fetchPosts = async () => {
      try {
        const { data, error } = await supabase.from('posts').select('*');
        if (error) {
          throw error;
        }
        console.log('Posts:', data);
      } catch (error) {
        console.error('Error fetching posts:', error.message);
      }
    };
    fetchPosts();
  }, []);

  return (
    <Router>
      <Switch>
        <Route exact path="/" component={HomeFeed} />
        <Route exact path="/posts/:postId" component={PostPage} />
        <Route exact path="/create" component={CreateForm} />
        <Route exact path="/posts/:postId/edit" component={EditDeletePost} />
      </Switch>
    </Router>
  );
}

export default App;