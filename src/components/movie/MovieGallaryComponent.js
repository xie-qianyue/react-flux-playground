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
    
    if(this.state.firstIndexMovieOnShow > 0) {
      this.setState({
        firstIndexMovieOnShow: this.state.firstIndexMovieOnShow - 1,
        lastIndexMovieOnShow: this.state.lastIndexMovieOnShow - 1,
      });
    }
  }

  handleNext() {
    
    let lastIndexMovies = this.props.movies.length - 1;
    
    if(this.state.lastIndexMovieOnShow < lastIndexMovies) {
      this.setState({
        firstIndexMovieOnShow: this.state.firstIndexMovieOnShow + 1,
        lastIndexMovieOnShow: this.state.lastIndexMovieOnShow + 1,
      });
    }
  }

  render() {

    // display 3 movies at one time
    let moviesList = this.props.movies.slice(this.state.firstIndexMovieOnShow, this.state.lastIndexMovieOnShow).map(movie => {
      return (
        <Col xs={6} md={4}>
          <MovieComponent ImgSrc={movie.images.large} title={movie.title} key={movie.id}/>
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
            <Pager>
              <PageItem previous onSelect={this.handlePrevious} disabled={this.state.firstIndexMovieOnShow === 0}>Previous</PageItem>
              <PageItem next onSelect={this.handleNext} disabled={this.state.lastIndexMovieOnShow === (this.props.movies.length - 1)}>Next</PageItem>
            </Pager>
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
