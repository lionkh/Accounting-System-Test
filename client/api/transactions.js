import apiMiddleware from "../middlewares/apiMiddleware";

import { URL } from '../config';

import Transaction from '../models/Transaction';

export function fetchTransactions() {
  return new Promise((resolve, reject) => {
    apiMiddleware(URL.transactions.get, 'get')
        .then(res => {
          resolve(res.data.map(item => new Transaction(item)));
        })
        .catch(error => {
          reject(error);
        })
  });

}