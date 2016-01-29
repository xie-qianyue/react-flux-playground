'use strict';

require('styles/bootstrap.css');
require('styles/movie/MoviesPage.css');

import React from 'react';
import MovieGallaryComponent from './MovieGallaryComponent';
import MovieStore from '../../stores/MovieStores';
import MovieActions from '../../actions/MovieActions';

class MoviesPageComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = MovieStore.getStore();
    this.onChangeState = this.onChangeState.bind(this);
  }

  componentDidMount() {
    MovieStore.addChangeListener(this.onChangeState);
    MovieActions.getMoviesInCinema();
  }

  componentWillUnmount() {
    MovieStore.removeChangeListener(this.onChangeState);
  }

  // callback for reset the this.state
  onChangeState() {
    this.setState(MovieStore.getStore());
  }

  render() {
    return (
      <div className="container">
        <MovieGallaryComponent movies={this.state.moviesInCinema} loaded={this.state.loaded}/>

      </div>
    );
  }
}

MoviesPageComponent.displayName = 'MovieMoviesPageComponent';

// Uncomment properties you need
// MoviesPageComponent.propTypes = {};
// MoviesPageComponent.defaultProps = {};

export default MoviesPageComponent;
