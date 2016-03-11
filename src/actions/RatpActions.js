import AppDispatcher from '../dispatcher/AppDispatcher';
import RatpConstants from '../constants/RatpConstants';

const RatpActions = {

  updateHoraires() {
    AppDispatcher.dispatch({
      actionType: RatpConstants.UPDATE_HORAIRES
    });
  }

};

export default RatpActions;