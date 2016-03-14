'use strict';

import React from 'react';
import RatpActions from '../../actions/RatpActions';
import RatpStore from '../../stores/RatpStores';

require('styles/ratp/AddLine.css');

class AddLineComponent extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      lines: [],
      stations: [],
      destinations: []
    }

    this.onChangeState = this.onChangeState.bind(this);
  }

  componentDidMount() {
    RatpStore.addChangeNewLineListener(this.onChangeState);
  }

  componentWillUnmount() {
    RatpStore.removeChangeNewLineListener(this.onChangeState);
  }

  onChangeState() {
    this.setState({
      lines: RatpStore.getStore().newLines,
      stations: RatpStore.getStore().newStations,
      destinations: RatpStore.getStore().newDestinations
    });
    this.refs.line.disabled = false;
  }  

  onSelectType(event) {
    debugger;
    RatpActions.getLinesByType(event.target.value);
  }

  render() {

    let LineOptions = this.state.lines.map((line) => {
      return (
        <option value={line}>{line}</option>
      )
    });

    return (
      <div className="addline-component">
        <select onChange={this.onSelectType}>
          <option value="rers">rers</option>
          <option value="metros">metros</option>
          <option value="tramways">tramways</option>
          <option value="bus">bus</option>
        </select>
        <select ref="line" disabled="true">
          {LineOptions}   
        </select>        
      </div>
    );
  }
}

AddLineComponent.displayName = 'RatpAddLineComponent';

// Uncomment properties you need
// AddLineComponent.propTypes = {};
// AddLineComponent.defaultProps = {};

export default AddLineComponent;
