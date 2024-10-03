import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import DestinationList from './components/DestinationList';
import ReviewList from './components/ReviewList';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/destinations" component={DestinationList} />
        <Route path="/destination/:id/reviews" component={ReviewList} />
        {/* Add more routes as needed */}
      </Switch>
    </Router>
  );
}

export default App;
