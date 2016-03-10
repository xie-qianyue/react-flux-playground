'use strict';

import React from 'react';
import RatpHoraireComponent from './RatpHoraireComponent';

require('styles/ratp/RatpPage.css');
require('styles/bootstrap.css');

class RatpPageComponent extends React.Component {
  render() {
    return (
      <div className="container">
        <RatpHoraireComponent/>
      </div>
    );
  }
}

RatpPageComponent.displayName = 'RatpRatpPageComponent';

// Uncomment properties you need
// RatpPageComponent.propTypes = {};
// RatpPageComponent.defaultProps = {};

export default RatpPageComponent;
