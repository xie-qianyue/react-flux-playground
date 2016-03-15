'use strict';

import React from 'react';
import { Input } from 'react-bootstrap';
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
    this.onSelectLine = this.onSelectLine.bind(this);
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
  }  

  onSelectType(event) {
    RatpActions.getLinesByType(event.target.value);
  }

  onSelectLine(event) {
    debugger;
    let type = this.refs.type.getValue(),
        lineSeleted = event.target.value;
    RatpActions.getStationsByTypeAndLine(type, lineSeleted);
    // update destinations
    this.state.lines.some((line) => {
      debugger;
      if(line.line === lineSeleted) {
        this.state.setState{
          destinations: line.destinations
        };
        // break
        return true;
      }
    }, this)  
  }

  render() {

    let lineOptions = this.state.lines.map(line => {
      return (
        <option value={line.line} key={line.line}>{line.line}</option>
      );
    });

    let stationOptions = this.state.stations.map(station => {
      return (
        <option value={station.id} key={station.id}>{station.name}</option>
      );
    });

    let destinationOptions = this.state.destinations.map(destination => {
      return (
        <option value={destination.id} key={destination.id}>{destination.name}</option>
      );
    });

    return (
      <div className="addline-component">
        <form>
          <Input type="select" label="Line Type" placeholder="select line type" ref="type" onChange={this.onSelectType}>
            <option value="" disable>-- select type --</option>
            <option value="rers">rers</option>
            <option value="metros">metros</option>
            <option value="tramways">tramways</option>
            <option value="bus">bus</option>
          </Input>
          <Input type="select" label="Line" ref="line" disabled={this.state.lines.length==0} onChange={this.onSelectLine}>
            <option value="" disable>-- select line --</option>
            {lineOptions}   
          </Input>
          <Input type="select" label="Station" ref="station" disabled={this.state.stations.length==0}>
            <option value="" disable>-- select station --</option>
            {stationOptions}   
          </Input>
          <Input type="select" label="Destination" ref="destination" disabled={this.state.destinations.length==0}>
            <option value="" disable>-- select destination --</option>
            {destinationOptions}
          </Input>
        </form>
      </div>
    );
  }
}

AddLineComponent.displayName = 'RatpAddLineComponent';

// Uncomment properties you need
// AddLineComponent.propTypes = {};
// AddLineComponent.defaultProps = {};

export default AddLineComponent;
