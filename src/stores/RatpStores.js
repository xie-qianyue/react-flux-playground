'use strict';

import { EventEmitter } from 'events';
import RatpActions from '../constants/RatpConstants';
import AppDispatcher from '../dispatcher/AppDispatcher';
import $ from 'jquery';

// class of horaire
class Horaire {
  constructor(typeLine, line, station, destination, next, nnext) {
    this.typeLine = typeLine;
    this.line = line;
    this.station = station;
    this.destination = destination;
    this.next = next;
    this.nnext = nnext;
  }
}

const CHANGE_EVENT = 'change';

const _ratpStore = {
  horaires: [
    new Horaire('bus', '126', '1658', '70', '', '')
  ]
};

const MovieStore = Object.assign({}, EventEmitter.prototype, {

  getStore: function() {
    return _movieStore;
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

AppDispatcher.register(action => {

  switch(action.actionType) {
    
    case RatpActions.UPDATE_HORAIRES:

      break;

    default:
      // no op
  }
});