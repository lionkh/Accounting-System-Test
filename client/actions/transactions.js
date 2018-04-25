import { ACTIONS } from "./actionTypes";

export function createTransaction(transaction) {
  return dispatch => {
    dispatch({
      type: ACTIONS.CREATE_TRANSACTION,
      payload: transaction
    });
  }
}

export function deleteTransaction(id) {
  return dispatch => {
    dispatch({
      type: ACTIONS.DELETE_TRANSACTION,
      payload: id
    });
  }
}