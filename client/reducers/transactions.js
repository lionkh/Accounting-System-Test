import { ACTIONS } from '../actions/actionTypes';
import Transaction from "../models/Transaction";

const INITIAL_STATE = {
  data: [new Transaction({ id: 1, type: 'credit', amount: 100, effectiveDate: Date.now() })],
  loading: false
};

export default function transactions(state = { ...INITIAL_STATE }, action = {}) {
  switch (action.type) {
    case ACTIONS.REQUEST_TRANSACTIONS:
      return { ...state, loading: true };

    case ACTIONS.RECEIVE_TRANSACTIONS:
      return { data: action.data, loading: false };

    default:
      return state;
  }
}
