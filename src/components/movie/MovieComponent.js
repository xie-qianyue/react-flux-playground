'use strict';

require('styles/bootstrap.css');
require('styles/movie/Movie.css');

import React from 'react';
import { Image } from 'react-bootstrap';

class MovieComponent extends React.Component {

  render() {
    return (
      <div>
        <div>
          <Image src={this.props.ImgSrc} thumbnail />
        </div>
        <div>
          <span>{this.props.title}</span>
        </div>
      </div>
    );
  }
}

MovieComponent.displayName = 'MovieMovieComponent';

MovieComponent.propTypes = {
  ImgSrc: React.PropTypes.string,
  title: React.PropTypes.string
};

MovieComponent.defaultProps = {
  ImgSrc: '',
  title: ''
};

export default MovieComponent;
