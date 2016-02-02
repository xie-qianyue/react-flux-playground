'use strict';

require('styles/movie/MovieDetails.css');

import React from 'react';
import { Panel } from 'react-bootstrap';

class MovieDetailsComponent extends React.Component {
  render() {

    // let movieDetail;
    // debugger;
    // if(this.props.movie){
    //   movieDetail = (
    //     <Panel header={this.props.movie.title}>
    //       <ul>
    //         <li><span>Raing: </span>{this.props.movie.rating.average}</li>
    //         <li><span>Genres: </span>{this.props.movie.genres}</li>
    //         <li><span>Actors: </span>{this.props.movie.casts}</li>
    //       </ul>
    //     </Panel>
    //   );
    // }

    let genresLst = this.props.movie.genres.map(genre => {
      return (<li>{genre}</li>);
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
            <li><span>Actors: </span></li>
            <ul> {actorsLst} </ul>
          </ul>
        </Panel>
      </div>
    );
  }
}

MovieDetailsComponent.displayName = 'MovieMovieDetailsComponent';

// MovieDetailsComponent.propTypes = {
//   movie: React.PropTypes.object
// };
// MovieDetailsComponent.defaultProps = {};

export default MovieDetailsComponent;
