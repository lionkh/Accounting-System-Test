const Transaction = require('../models/Transaction');

class TransactionService {
  static getGlobalAmount() {
    return new Promise(resolve => {
      const AMOUNT = localStorage.getItem('amount') ? JSON.parse(localStorage.getItem('amount')) : 0;

      resolve(AMOUNT);
    });
  }

  static findAll() {
    return new Promise(resolve => {
      const TRANSACTIONS = localStorage.getItem('transactions') ? JSON.parse(localStorage.getItem('transactions')) : [];

      resolve(TRANSACTIONS.map(transaction => new Transaction(transaction)));
    });
  }

  static findById(id) {
    return new Promise((resolve, reject) => {
      this.findAll()
          .then(transactions => {
            const TRANSACTION = transactions.find(item => item.id === id);

            if (TRANSACTION) {
              resolve(TRANSACTION);
            }
            else {
              reject(new Error());
            }
          })
    });
  }

  static deleteById(id) {
    return new Promise((resolve, reject) => {
      this.findAll()
          .then(transactions => {
            const TRANSACTION = transactions.find(item => item.id === id);
            if (TRANSACTION) {
              transactions.splice(transactions.indexOf(TRANSACTION), 1);
              this.updateStorageValue('transactions', transactions)
                  .then(() => {
                    resolve({});
                  });
            }
            else {
              reject(new Error());
            }
          })
          .catch(error => {
            reject(error);
          })
    });
  }

  static updateStorageValue(key, value) {
    return new Promise(resolve => {
      localStorage.setItem(key, JSON.stringify(value));

      resolve(value);
    });
  }
}

module.exports = TransactionService;