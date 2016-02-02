'use strict';

require('styles/bootstrap.css');
require('styles/movie/MoviesPage.css');

import React from 'react';
import MovieGallaryComponent from './MovieGallaryComponent';
import MovieStore from '../../stores/MovieStores';
import MovieActions from '../../actions/MovieActions';
import MovieDetailsComponent from './MovieDetailsComponent';

class MoviesPageComponent extends React.Component {

  constructor(props) {
    super(props);

    // is Object.assign neccessaire?
    this.state = Object.assign({}, MovieStore.getStore());

    this.onChangeState = this.onChangeState.bind(this);
    this.handleUpdateMovieDetail = this.handleUpdateMovieDetail.bind(this);
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

  handleUpdateMovieDetail(movieId) {
    if(this.state.moviesInCinema.length > 0) {
      for(let movie of this.state.moviesInCinema) {
        if(movie.id === movieId) {
          this.setState({
            seletedMovie: movie
          })
        }
      }
    }
  }

  render() {

    // let seletedMovie;
    // if(this.state.seletedMovie) {
    //   seletedMovie = (<MovieDetailsComponent movie={this.state.seletedMovie}/>);
    // }

    return (
      <div className="container">
        <MovieGallaryComponent movies={this.state.moviesInCinema} loaded={this.state.loaded} updateMovieDetail={this.handleUpdateMovieDetail}/>
        {this.state.seletedMovie ? <MovieDetailsComponent movie={this.state.seletedMovie}/> : null}
      </div>
    );
  }
}

MoviesPageComponent.displayName = 'MovieMoviesPageComponent';

MoviesPageComponent.propTypes = {
  movies: React.PropTypes.array,
  loaded: React.PropTypes.bool,
  updateMovieDetail: React.PropTypes.func
};

export default MoviesPageComponent;
