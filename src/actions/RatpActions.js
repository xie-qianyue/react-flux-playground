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
      actionType: RatpConstants.GET_LINES,
      data: type
    });
  },

  getStationsByTypeAndLine(type, line) {
    AppDispatcher.dispatch({
      actionType: RatpConstants.GET_STATIONS,
      data: {
        type: type,
        line: line
      }
    });
  },

  addLine(type, line, stationId, stationName, destinationId, destinationName) {
    AppDispatcher.dispatch({
      actionType: RatpConstants.ADD_LINE,
      data: {
        type: type,
        line: line,
        stationId: stationId,
        stationName: stationName,
        destinationId: destinationId,
        destinationName: destinationName
      }
    });
  }
};

export default RatpActions;