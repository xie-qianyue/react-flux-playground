'use strict';

import React from 'react';
import RatpHoraireComponent from './RatpHoraireComponent';
import RatpActions from '../../actions/RatpActions';
import RatpStore from '../../stores/RatpStores';

require('styles/ratp/RatpPage.css');
require('styles/bootstrap.css');

class RatpPageComponent extends React.Component {

  constructor(props) {
    super(props);

    this.state = Object.assign({}, RatpStore.getStore());

    this.onChangeState = this.onChangeState.bind(this);
  }
/*
  componentWillMount() {
    // refresh horaires every 10s
    this.timer = setInterval(RatpActions.updateHoraires(), 10000);
  }
*/
  componentDidMount() {
    this.timer = setInterval(RatpActions.updateHoraires(), 10000);
    RatpStore.addChangeListener(this.onChangeState);
  }

  componentWillUnmount() {
    RatpStore.removeChangeListener(this.onChangeState);
    clearInterval(this.timer);
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
