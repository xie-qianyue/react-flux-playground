import AppDispatcher from '../dispatcher/AppDispatcher';
import MovieConstants from '../constants/MovieConstants';

const MovieActions = {

  getMoviesInCinema() {
    AppDispatcher.dispatch({
      actionType: MovieConstants.GET_MOVIES
    });
  }

};

export default MovieActions;