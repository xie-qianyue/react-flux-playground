require('normalize.css');
require('styles/App.css');

import React from 'react';
import App from './Main';
import MoviesPageComponent from './movie/MoviesPageComponent';
import RatpPageComponent from './ratp/RatpPageComponent';
import OnlineCommunComponent from './onlineCommun/OnlineCommunComponent';
import { Router, Route, browserHistory } from 'react-router';

class MyRouter extends React.Component {
  render() {
    return (
      <Router history={browserHistory}>
        <Route path="/" component={App}>
          <Route path="ratp" component={RatpPageComponent} />
          <Route path="doubanMovie" component={MoviesPageComponent} />
          <Route path="douabnOnlinecommun" component={OnlineCommunComponent} />
        </Route>
        {/*<Route path="*" component={App}/>*/}
      </Router>
    );
  }
}

export default MyRouter;
