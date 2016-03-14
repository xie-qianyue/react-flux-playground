'use strict';

import React from 'react';
import RatpActions from '../../actions/RatpActions';
import RatpStore from '../../stores/RatpStores';
import { SplitButton, MenuItem } from 'react-bootstrap';

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

  onSelectType(event, eventKey) {
    debugger;
    RatpActions.getLinesByType(eventKey);
    event.target.title = eventKey;
  }

  render() {

    let LineMenuItems = this.state.lines.map((line) => {
      return (
        <MenuItem eventKey={line}>{line}</MenuItem>
      )
    });

    return (
      <div className="addline-component">
        <SplitButton bsStyle="default" title="Type" id="type" onSelect={this.onSelectType}>
          <MenuItem eventKey="rers">rers</MenuItem>
          <MenuItem eventKey="metros">metros</MenuItem>
          <MenuItem eventKey="tramways">tramways</MenuItem>
          <MenuItem eventKey="bus">bus</MenuItem>
        </SplitButton>
        <SplitButton bsStyle='default' title="Line" id="line" ref="line" disabled="true">
          {LineMenuItems}   
        </SplitButton>        
      </div>
    );
  }
}

AddLineComponent.displayName = 'RatpAddLineComponent';

// Uncomment properties you need
// AddLineComponent.propTypes = {};
// AddLineComponent.defaultProps = {};

export default AddLineComponent;
