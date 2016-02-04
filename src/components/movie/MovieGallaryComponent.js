'use strict';

require('styles/movie/MovieGallary.css');

import React from 'react';
import Loader from 'react-loader';
import { Grid, Row, Col, Pager, PageItem } from 'react-bootstrap';
import MovieComponent from './MovieComponent';

class MovieGallaryComponent extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      firstIndexMovieOnShow: 0,
      lastIndexMovieOnShow: 3
    };

    this.handlePrevious = this.handlePrevious.bind(this);
    this.handleNext = this.handleNext.bind(this);
  }

  handlePrevious() {

    let firstIndex = this.state.firstIndexMovieOnShow - 3;
    
    this.props.updateMovieDetail(this.props.movies[firstIndex].id);

    if(this.state.firstIndexMovieOnShow > 0) {
      this.setState({
        firstIndexMovieOnShow: firstIndex,
        lastIndexMovieOnShow: this.state.lastIndexMovieOnShow - 3
      });
    }
  }

  handleNext() {
    
    let lastIndexMovies = this.props.movies.length - 1,
        firstIndex = this.state.firstIndexMovieOnShow + 3;

    this.props.updateMovieDetail(this.props.movies[firstIndex].id);
    
    if(this.state.lastIndexMovieOnShow < lastIndexMovies) {
      this.setState({
        firstIndexMovieOnShow: firstIndex,
        lastIndexMovieOnShow: this.state.lastIndexMovieOnShow + 3
      });
    }
  }

  // handlePropagateMovie(movieId) {
  //   console.log('click movie : ' + movieId);
  //   this.props.updateMovieDetail(movieId);
  // }

  render() {

    // display 4 movies at one time
    let moviesList = this.props.movies.slice(this.state.firstIndexMovieOnShow, this.state.lastIndexMovieOnShow).map(movie => {
      return (
        <Col xs={6} md={4}>
          <MovieComponent ImgSrc={movie.images.large} title={movie.title} key={movie.id} propagateSeletedMovie={this.props.updateMovieDetail.bind(null, movie.id)} />
        </Col>
      );
    }, this);

    return (
      <div>
        <Grid>
          <Row>
            <h2>Movies on show in Beijing</h2>
          </Row>
          <Loader loaded={this.props.loaded}>
            <Row>
              {moviesList}
            </Row>
            <Row>
              {Math.ceil(this.state.firstIndexMovieOnShow / 3) + 1} / {Math.ceil(this.props.movies.length / 3)}
              <Pager>
                <PageItem onSelect={this.handlePrevious} disabled={this.state.firstIndexMovieOnShow <= 0}>Previous</PageItem>
                <PageItem onSelect={this.handleNext} disabled={this.state.lastIndexMovieOnShow >= (this.props.movies.length - 1)}>Next</PageItem>
              </Pager>
            </Row>
          </Loader>
        </Grid>
      </div>
    );
  }
}

MovieGallaryComponent.displayName = 'MovieMovieGallaryComponent';

MovieGallaryComponent.propTypes = {
  loaded: React.PropTypes.bool,
  movies: React.PropTypes.array,
  updateMovieDetail: React.PropTypes.func
};

MovieGallaryComponent.defaultProps = {
  loaded: false,
  movies: []
};

export default MovieGallaryComponent;
