'use strict';

import { EventEmitter } from 'events';
import RatpActions from '../constants/RatpConstants';
import AppDispatcher from '../dispatcher/AppDispatcher';
import $ from 'jquery';
import Immutable from 'immutable';

// class of horaire
class Horaire {
  constructor(typeLine, line, stationId, stationName, destinationId, destinationName, next='', nnext='') {
    this.typeLine = typeLine;
    this.line = line;
    this.stationId = stationId;
    this.stationName = stationName;
    this.destinationId = destinationId;
    this.destinationName = destinationName;
    this.next = next;
    this.nnext = nnext;
  }
}

const CHANGE_HORAIRES_EVENT = 'changeHoraires';
const CHANGE_NEW_LINE_EVENT = 'changeNewLine';

/**
 *  newLines:
 *  [
 *    {
 *      line: 'A'
 *      destinations: [
 *        {id: 1, name: 'St-Germain-en-Laye Poissy-Cergy'}, ...
 *      ]
 *    }, ...
 *  ]
 */
let _ratpStore = {
  horaires: Immutable.Map({'bus-126-1658-70': new Horaire('bus', '126', '1658', 'Issy Val de Seine', '70', 'Porte D Orleans')}),
  newLines: [],
  newStations: [],
  newDestinations: []
};

const RatpStore = Object.assign({}, EventEmitter.prototype, {

  getStore: function() {
    return _ratpStore;
  },

  emitChangeHoraires: function() {
    this.emit(CHANGE_HORAIRES_EVENT);
  },

  emitChangeNewLine: function() {
    this.emit(CHANGE_NEW_LINE_EVENT);
  },

  addChangeHorairesListener: function(callback) {
    this.on(CHANGE_HORAIRES_EVENT, callback);
  },

  removeChangeHorairesListener: function(callback) {
    this.removeListener(CHANGE_HORAIRES_EVENT, callback);
  },

  addChangeNewLineListener: function(callback) {
    this.on(CHANGE_NEW_LINE_EVENT, callback);
  },

  removeChangeNewLineListener: function(callback) {
    this.removeListener(CHANGE_NEW_LINE_EVENT, callback);
  }

});

function updateHoraires(horaire) {
  let request = 'http://api-ratp.pierre-grimaud.fr/v2/' + horaire.typeLine + '/' + horaire.line + '/stations/' + horaire.stationId + '?destination=' + horaire.destinationId;
  return $.getJSON(request);
}

function getLinesByType(type) {
  let request = 'http://api-ratp.pierre-grimaud.fr/v2/' + type;
  return $.getJSON(request);
}

function getStationsByTypeAndLine(type, line) {
  let request = 'http://api-ratp.pierre-grimaud.fr/v2/' + type + '/' + line + '/stations';
  return $.getJSON(request);
}

AppDispatcher.register(action => {

  switch(action.actionType) {
    case RatpActions.UPDATE_HORAIRES:
      _ratpStore.horaires.forEach((horaire, id) => {
        updateHoraires(horaire).then(res => {
          let oldHoraire = _ratpStore.horaires.get(id);
          let next = oldHoraire.next,
              nnext = oldHoraire.nnext,
              newNext = res.response.schedules[0].message,
              newNnext = res.response.schedules[1].message;
          
          if(next !== newNext || nnext !== newNnext) {
            _ratpStore.horaires.update(id, () => {
              oldHoraire.next = newNext;
              oldHoraire.nnext = newNnext;
              return oldHoraire;
            });

            RatpStore.emitChangeHoraires();
          }
        });
      });
      break;

    case RatpActions.GET_LINES:
      getLinesByType(action.data).then(res => {
        _ratpStore.newLines.length = 0;
        
        res.response[action.data].forEach(data => {
          _ratpStore.newLines.push(data);
        });

        // reset stations
        _ratpStore.newStations.length = 0;
        RatpStore.emitChangeNewLine();
      });
      break;

    case RatpActions.GET_STATIONS:
      getStationsByTypeAndLine(action.data.type, action.data.line).then(res => {
        _ratpStore.newStations.length = 0;
        res.response.stations.forEach(data => {
          _ratpStore.newStations.push({
            id: data.id,
            name: data.name
          });
        });
      });
      break;

    case RatpActions.ADD_LINE:
      let type = action.data.type,
          line = action.data.line,
          stationId = action.data.stationId,
          stationName = action.data.stationName,
          destinationId = action.data.destinationId,
          destinationName = action.data.destinationName;
      let idHoraire = type + '-' + line + '-' + stationId + '-' + destinationId,
          horaire = new Horaire(type, line, stationId, stationName, destinationId, destinationName);
      _ratpStore.horaires = _ratpStore.horaires.concat({idHoraire, horaire});
      
      // reset add form
      _ratpStore.newLines.length = 0;
      _ratpStore.newStations.length = 0;
      _ratpStore.newDestinations.length = 0;
      RatpStore.emitChangeNewLine();
      break;
    default:
      // no op
  }
});

export default RatpStore;