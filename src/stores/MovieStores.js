'use strict';

import { EventEmitter } from 'events';
import MovieActions from '../constants/MovieConstants';
import AppDispatcher from '../dispatcher/AppDispatcher';
import $ from 'jquery';

const CHANGE_EVENT = 'change';

let _movieStore = {
  moviesInCinema: [],
  seletedMovie: null,
  loaded: false
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

function getMoviesInCinema() {
  // get data by jsonp
  return $.getJSON('https://api.douban.com/v2/movie/in_theaters?callback=?');
}

AppDispatcher.register(action => {

  switch(action.actionType) {
    
    case MovieActions.GET_MOVIES:
      getMoviesInCinema()
        .then(res => {
          
          // "immutable" _movieStore
          _movieStore = {
            moviesInCinema: res.subjects,
            seletedMovie: res.subjects[0],
            loaded: true
          };

          // console.log(_movieStore.moviesInCinema);

          MovieStore.emitChange();
        });
      break;

    default:
      // no op
  }
});

export default MovieStore;