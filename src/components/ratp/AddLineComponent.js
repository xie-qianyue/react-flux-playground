'use strict';

import React from 'react';
import { ButtonInput } from 'react-bootstrap';
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
      line: '',
      stationId: '',
      stationName: '',
      destinationId: '',
      destinationName: ''
    }

    this.onChangeState = this.onChangeState.bind(this);
    this.onSelectType = this.onSelectType.bind(this);
    this.onSelectLine = this.onSelectLine.bind(this);
    this.onSelectStation = this.onSelectStation.bind(this);
    this.onSelectDestination = this.onSelectDestination.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.clearSelectedValue = this.clearSelectedValue.bind(this);
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
      stations: RatpStore.getStore().newStations
    });
  }

  onSelectType(typeOption) {
    if(typeOption) {
      let typeSelected = typeOption.value;
      this.setState({
        type: typeSelected
      });
      RatpActions.getLinesByType(typeSelected);
    } else {
      // reset select
      this.clearSelectedValue();
    }
  }

  onSelectLine(lineOption) {
    if(lineOption) {
      let lineSeleted = lineOption.value;
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

      RatpActions.getStationsByTypeAndLine(this.state.type, lineSeleted);

    } else {
      this.setState({
        line: '',
        stationId: '',
        stationName: '',
        destinationId: '',
        destinationName: ''
      });
    }
  }

  onSelectStation(stationOption) {
    if(stationOption) {
      this.setState({
        stationId: stationOption.value,
        stationName: stationOption.label
      });
    } else {
       this.setState({
        stationId: '',
        stationName: ''
      });
    }
  }

  onSelectDestination(destinationOption) {
    if(destinationOption) {
      this.setState({
        destinationId: destinationOption.value,
        destinationName: destinationOption.label
      });
    } else {
       this.setState({
        destinationId: '',
        destinationName: ''
      });
    }
  }

  onSubmit(event) {
    event.preventDefault();
    RatpActions.addLine(this.state.type, this.state.line, this.state.stationId, this.state.stationName, this.state.destinationId, this.state.destinationName);
    // reset state
    this.clearSelectedValue();
  }

  clearSelectedValue() {
    this.setState({
      type: '',
      line: '',
      stationId: '',
      stationName: '',
      destinationId: '',
      destinationName: ''
    });
  }

  render() {

    let lineOptions = this.state.lines.map(line => {
      return (
        {value: line.line, label: line.line}
      );
    });

    let stationOptions = this.state.stations.map(station => {
      return (
         {value: station.id, label: station.name}
      );
    });

    let destinationOptions = this.state.destinations.map(destination => {
      return (
        {value: destination.id, label: destination.name}
      );
    });

    return (
      <div className="addline-component">
        <form>
          <h3>Add a new line</h3>
          <Row>
            <Col xs={2}>
              <Select
                name="Type"
                value={this.state.type}
                options={this.state.typeOptions}
                onChange={this.onSelectType}
                placeholder="Line Type"
              />
            </Col>
            <Col xs={2}>
              <Select
                name="Line"
                value={this.state.line}
                options={lineOptions}
                disabled={this.state.type==''}
                onChange={this.onSelectLine}
                placeholder="Line"
              />
            </Col>
            <Col xs={4}>
              <Select
                name="Station"
                value={this.state.stationId}
                options={stationOptions}
                disabled={this.state.line=='' || this.state.stations.length==0}
                onChange={this.onSelectStation}
                placeholder="Station"
              />
            </Col>
            <Col xs={3}>
              <Select
                name="Destination"
                value={this.state.destinationId}
                options={destinationOptions}
                disabled={this.state.line==''}
                onChange={this.onSelectDestination}
                placeholder="Destination"
              />
            </Col>
            <Col xs={1}>
              <ButtonInput type="submit" value="Add" onClick={this.onSubmit}/>
            </Col>
          </Row>
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
