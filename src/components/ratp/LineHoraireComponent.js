'use strict';

import React from 'react';
import { Row, Col } from 'react-bootstrap';

require('styles/ratp/LineHoraire.css');

class LineHoraireComponent extends React.Component {

  render() {
    return (
      <div className="linehoraire-component">
        <Row>
          <Col xs={2}>
            {this.props.line}
          </Col>
          <Col xs={3}>
            {this.props.station}
          </Col>
          <Col xs={3}>
            {this.props.destination}
          </Col>
          <Col xs={2}>
            {this.props.next}
          </Col>
          <Col xs={2}>
            {this.props.nnext}
          </Col>
        </Row>
      </div>
    );
  }
}

LineHoraireComponent.displayName = 'RatpLineHoraireComponent';

// Uncomment properties you need
LineHoraireComponent.propTypes = {
  line: React.PropTypes.string,
  station: React.PropTypes.string,
  destination: React.PropTypes.string,
  next: React.PropTypes.string,
  nnext: React.PropTypes.string
};
// LineHoraireComponent.defaultProps = {};

export default LineHoraireComponent;
