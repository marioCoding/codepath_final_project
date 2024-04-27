// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CreateForm from './CreateForm';
import PostList from './PostList';
import PostDetail from './PostDetail';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={PostList} />
        <Route exact path="/posts/:postId" component={PostDetail} />
        <Route exact path="/create" component={CreateForm} />
      </Switch>
    </Router>
  );
}

export default App;