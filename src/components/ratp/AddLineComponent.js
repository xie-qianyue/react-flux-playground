'use strict';

import React from 'react';
import { Input, ButtonInput } from 'react-bootstrap';
import RatpActions from '../../actions/RatpActions';
import RatpStore from '../../stores/RatpStores';
import Select from 'react-select';
import { Row, Col } from 'react-bootstrap';

require('styles/ratp/AddLine.css');
require('react-select/dist/react-select.css')

class AddLineComponent extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      lines: [],
      stations: [],
      destinations: [],
      typeOptions:[
        {value: 'rers', label: 'RER'},
        {value: 'metros', label: 'Metro'},
        {value: 'tramways', label: 'Tramway'},
        {value: 'bus', label: 'Bus'}
      ],
      type: '',
      line: ''
    }

    this.onSelectType = this.onSelectType.bind(this);
    this.onChangeState = this.onChangeState.bind(this);
    this.onSelectLine = this.onSelectLine.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
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

  onSelectType(typeOption) {
    if(typeOption){
      let typeSelected = typeOption.value;
      this.setState({
        type: typeSelected
      });
      RatpActions.getLinesByType(typeSelected);
    }else{
      // reset select
      this.setState({
        type: ''
      });
    }
  }

  onSelectLine(lineOption) {
    if(lineOption){
      let lineSeleted = lineOption.value;
      RatpActions.getStationsByTypeAndLine(this.state.type, lineSeleted);
      // update destinations
      this.state.lines.some((line) => {
        if(line.line === lineSeleted) {
          this.setState({
            destinations: line.destinations,
            line: lineSeleted
          });
          // break
          return true;
        }
      }, this);
    }else{
      this.setState({
        line: ''
      });
    }
  }

  onSubmit(event){
    event.preventDefault();
    let stationDOM = this.refs.station.getInputDOMNode(),
        destinationDOM = this.refs.destination.getInputDOMNode();
    let type = this.refs.type.getValue(),
        line = this.refs.line.getValue(),
        stationId = this.refs.station.getValue(),
        destinationId = this.refs.destination.getValue(),
        stationName = stationDOM.options[stationDOM.selectedIndex].text,
        destinationName = destinationDOM.options[destinationDOM.selectedIndex].text;
    RatpActions.addLine(type, line, stationId, stationName, destinationId, destinationName);
  }

  render() {

    let lineOptions = this.state.lines.map(line => {
      return (
        {value: line.line, label: line.line}
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
          <Row>
            <Col xs={2}>
              <Select
                name="Line Type"
                value={this.state.type}
                options={this.state.typeOptions}
                onChange={this.onSelectType}
                placeholder="select line type"
              />
            </Col>
            <Col xs={2}>
              <Select
                name="Line"
                value={this.state.line}
                options={lineOptions}
                disabled={this.state.type==''}
                onChange={this.onSelectLine}
              />
            </Col>
          </Row>

          <Input type="select" label="Station" ref="station" disabled={this.state.stations.length==0}>
            <option value="" disable>-- select station --</option>
            {stationOptions}
          </Input>
          <Input type="select" label="Destination" ref="destination" disabled={this.state.destinations.length==0}>
            <option value="" disable>-- select destination --</option>
            {destinationOptions}
          </Input>
           <ButtonInput type="submit" value="Submit Button" onClick={this.onSubmit}/>
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
