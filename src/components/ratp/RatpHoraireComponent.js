'use strict';

import React from 'react';
import { Grid } from 'react-bootstrap';
import LineHoraireComponent from './LineHoraireComponent';

require('styles/ratp/RatpHoraire.css');

class RatpHoraireComponent extends React.Component {

  render() {

    let horaireList = this.props.horaires.map(horaire => {
      return (      
        <LineHoraireComponent key={horaire.id} line={horaire.line} station={horaire.stationName} destination={horaire.destinationName} next={horaire.next} nnext={horaire.nnext} />
      );
    }, this);

    return (
      <div className="ratphoraire-component">
        <Grid>
          {horaireList}
        </Grid>
      </div>
    );
  }
}

RatpHoraireComponent.displayName = 'RatpRatpHoraireComponent';

// RatpHoraireComponent.propTypes = {};

// RatpHoraireComponent.defaultProps = {};

export default RatpHoraireComponent;
