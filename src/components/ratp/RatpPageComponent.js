'use strict';

import React from 'react';
import RatpHoraireComponent from './RatpHoraireComponent';
import RatpStore from '../../stores/RatpStores';

require('styles/ratp/RatpPage.css');
require('styles/bootstrap.css');

class RatpPageComponent extends React.Component {

  constructor(props) {
    super(props);

    this.state = Object.assign({}, RatpStore.getStore());

    this.onChangeState = this.onChangeState.bind(this);
  }

  componentDidMount() {
    RatpStore.addChangeListener(this.onChangeState);
  }

  componentWillUnmount() {
    RatpStore.removeChangeListener(this.onChangeState);
  }

  onChangeState() {
    this.setState(RatpStore.getStore());
  }

  render() {
    return (
      <div className="container">
        <RatpHoraireComponent horaires={this.state.horaires}/>
      </div>
    );
  }
}

RatpPageComponent.displayName = 'RatpRatpPageComponent';

// Uncomment properties you need
// RatpPageComponent.propTypes = {};
// RatpPageComponent.defaultProps = {};

export default RatpPageComponent;
