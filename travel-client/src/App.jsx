import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/index';
import AuthPage from './pages/authPage';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { register, login, googleLogin } from './actions/authActions';

const App = () => {
  return (
    <Provider store={store}>
      <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
        <Router>
          <div className="App">
            <Switch>
              <Route exact path="/auth" render={(props) => <AuthPage {...props} register={register} login={login} googleLogin={googleLogin} />} />
              {/* Other routes */}
              <Route exact path="/">
                <Redirect to="/auth" />
              </Route>
              <Route path="*">
                <h2>404 Page Not Found</h2>
              </Route>
            </Switch>
          </div>
        </Router>
      </GoogleOAuthProvider>
    </Provider>
  );
};

export default App;
