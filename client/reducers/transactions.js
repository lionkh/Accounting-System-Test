import { ACTIONS } from '../actions/actionTypes';
import Transaction from "../models/Transaction";
import { getCurrentDate } from "../utils/timeStampUtils";

const INITIAL_STATE = {
  data: [new Transaction({ id: 1, type: 'credit', amount: 100, effectiveDate: getCurrentDate() })],
  loading: false
};

export default function transactions(state = { ...INITIAL_STATE }, action = {}) {
  switch (action.type) {
    case ACTIONS.REQUEST_TRANSACTIONS:
      return { ...state, loading: true };

    case ACTIONS.RECEIVE_TRANSACTIONS:
      return { data: action.payload, loading: false };

    case ACTIONS.CREATE_TRANSACTION: {
      const NEW_STATE = { ...state };

      NEW_STATE.data.push(action.payload);
      return { ...state, ...NEW_STATE };
    }

    case ACTIONS.DELETE_TRANSACTION: {
      const NEW_STATE = { ...state };
      const INDEX = NEW_STATE.data.indexOf(NEW_STATE.data.find(item => item.id === action.payload));

      NEW_STATE.data.splice(INDEX, 1);
      return { ...state, ...NEW_STATE };
    }

    default:
      return state;
  }
}
