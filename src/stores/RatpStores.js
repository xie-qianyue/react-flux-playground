'use strict';

import { EventEmitter } from 'events';
import RatpActions from '../constants/RatpConstants';
import AppDispatcher from '../dispatcher/AppDispatcher';
import $ from 'jquery';
import Immutable from 'immutable';

// class of horaire
class Horaire {
  constructor(typeLine, line, stationId, stationName, destinationId, destinationName, next, nnext) {
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

const CHANGE_EVENT = 'change';

let _ratpStore = {
  horaires: Immutable.Map({"bus-126-1658-70": new Horaire('bus', '126', '1658', 'Issy Val de Seine', '70', 'Porte D Orleans', '', '')})
};

const RatpStore = Object.assign({}, EventEmitter.prototype, {

  getStore: function() {
    return _ratpStore;
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }

});

function updateHoraires(horaire) {
  let request = "http://api-ratp.pierre-grimaud.fr/v2/" + horaire.typeLine + '/' + horaire.line + '/stations/' + horaire.stationId + '?destination=' + horaire.destinationId;
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

            RatpStore.emitChange();
          }
        });
      });

      break;

    default:
      // no op
  }
});

export default RatpStore;