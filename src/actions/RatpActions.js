import AppDispatcher from '../dispatcher/AppDispatcher';
import RatpConstants from '../constants/RatpConstants';

const RatpActions = {

  updateHoraires() {
    AppDispatcher.dispatch({
      actionType: RatpConstants.UPDATE_HORAIRES
    });
  },

  getLinesByType(type) {
    AppDispatcher.dispatch({
      actionType: RatpConstants.GET_LINES_BY_TYPE,
      data: type
    })
  }

};

export default RatpActions;