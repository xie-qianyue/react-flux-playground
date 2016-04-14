'use strict';

import React from 'react';
import RatpHoraireComponent from './RatpHoraireComponent';
import AddLineComponent from './AddLineComponent';
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

  componentDidMount() {
    this.timer = setInterval(function(){
      RatpActions.updateHoraires();
    }, 3000);
    RatpStore.addChangeHorairesListener(this.onChangeState);
    RatpStore.addChangeNewLineListener(this.onChangeState);
  }

  componentWillUnmount() {
    RatpStore.removeChangeHorairesListener(this.onChangeState);
    RatpStore.removeChangeNewLineListener(this.onChangeState);
    clearInterval(this.timer);
  }

  onChangeState() {
    this.setState(RatpStore.getStore());
  }

  render() {
    return (
      <div className="container">
        <RatpHoraireComponent horaires={this.state.horaires}/>
        <AddLineComponent />
      </div>
    );
  }
}

RatpPageComponent.displayName = 'RatpRatpPageComponent';

// Uncomment properties you need
// RatpPageComponent.propTypes = {};
// RatpPageComponent.defaultProps = {};

export default RatpPageComponent;
