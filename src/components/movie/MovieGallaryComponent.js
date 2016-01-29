'use strict';

require('styles/movie/MovieGallary.css');

import React from 'react';
import Loader from 'react-loader';
import { Grid, Row, Col } from 'react-bootstrap';
import MovieComponent from './MovieComponent';

class MovieGallaryComponent extends React.Component {
  render() {

    // display the first 3 movies
    let moviesList = this.props.movies.slice(0,3).map(movie => {
      return (
        <Col xs={6} md={4}>
          <MovieComponent ImgSrc={movie.images.large} title={movie.title} />
        </Col>
      );
    });

    return (
      <div>
        <Grid>
          <Loader loaded={this.props.loaded}>
            <Row>
              {moviesList}
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
  movies: React.PropTypes.array
};

MovieGallaryComponent.defaultProps = {
  loaded: false,
  movies: []
};

export default MovieGallaryComponent;
