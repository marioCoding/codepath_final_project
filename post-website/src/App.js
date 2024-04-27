import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CreateForm from './components/CreateForm';
import HomeFeed from './components/HomeFeed';
import PostPage from './components/PostPage';
//import EditDeletePost from './EditDeletePost';

function App() {
  // Initialize Supabase subscription for real-time updates
  supabase.from('posts').on('*', () => {
    console.log('Real-time update received for posts');
  }).subscribe();

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