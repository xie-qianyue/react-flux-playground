'use strict';

require('styles/movie/MovieDetails.css');

import React from 'react';
import { Panel } from 'react-bootstrap';

class MovieDetailsComponent extends React.Component {
  render() {

    let genresLst = this.props.movie.genres.map(genre => {
      return (<li>{genre}</li>);
    });

    let directorLst = this.props.movie.directors.map(director => {
      return (<li>{director.name}</li>);
    });

    let actorsLst = this.props.movie.casts.map(cast => {
      return (<li>{cast.name}</li>);
    });

    return (
      <div>
        <Panel header={this.props.movie.title}>
          <ul>
            <li><span>Raing: </span>{this.props.movie.rating.average}</li>
            <li><span>Genres: </span></li>
            <ul> {genresLst} </ul>
            <li><span>Directors: </span></li>
            <ul> {directorLst} </ul>
            <li><span>Actors: </span></li>
            <ul> {actorsLst} </ul>
          </ul>
        </Panel>
      </div>
    );
  }
}

MovieDetailsComponent.displayName = 'MovieMovieDetailsComponent';

export default MovieDetailsComponent;
