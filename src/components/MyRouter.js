require('normalize.css');
require('styles/App.css');

import React from 'react';
import App from './Main';
import MoviesPageComponent from './movie/MoviesPageComponent';
import OnlineCommunComponent from './onlineCommun/OnlineCommunComponent';
import { Router, Route, browserHistory } from 'react-router';

class MyRouter extends React.Component {
  render() {
    return (
      <Router history={browserHistory}>
        <Route path="/" component={App}>
          <Route path="movie" component={MoviesPageComponent} />
          <Route path="onlinecommun" component={OnlineCommunComponent} />
        </Route>
        {/*<Route path="*" component={App}/>*/}
      </Router>
    );
  }
}

export default MyRouter;
