const uuidv1 = require('uuid/v1');
const moment = require('moment');

const TransactionService = require('../services/TransactionService');
const errors = require('../config/messages');

class TransactionController {
  static get prefix() {
    return '/transactions';
  }

  static index(req, res) {
    TransactionService.findAll()
        .then(transactions => res.status(200).json(transactions))
        .catch(() => res.sendStatus(500));
  }

  static create(req, res) {
    TransactionService.findAll()
        .then(transactions => {
              const TRANSACTION_TO_CREATE = Object.assign({}, JSON.parse(req.body.transaction), {
                id: uuidv1(),
                effectiveDate: moment().format('MMMM Do YYYY, h:mm:ss a')
              });
              let commonAmount = 0;
              transactions.forEach(item => {
                commonAmount = commonAmount + (parseFloat(item.amount));
              });

              TransactionService.getGlobalAmount()
                  .then(amount => {
                    if (TRANSACTION_TO_CREATE.type === 'credit' && (!amount || (parseFloat(amount) - parseFloat(TRANSACTION_TO_CREATE.amount)) < 0)) {
                      res.status(500).json({
                        error: {
                          message: errors.invalidAmount
                        }
                      });
                    }
                    else {
                      transactions.push(TRANSACTION_TO_CREATE);
                      TransactionService.updateStorageValue('transactions', transactions)
                          .then(() => {
                            let AMOUNT_TO_CHANGE = 0;

                            if (TRANSACTION_TO_CREATE.type === 'credit') {
                              AMOUNT_TO_CHANGE = parseFloat(amount) - parseFloat(TRANSACTION_TO_CREATE.amount);
                            }
                            else if (TRANSACTION_TO_CREATE.type === 'debit') {
                              AMOUNT_TO_CHANGE = parseFloat(amount) + parseFloat(TRANSACTION_TO_CREATE.amount);
                            }
                            TransactionService.updateStorageValue('amount', AMOUNT_TO_CHANGE);
                            res.status(200).json(TRANSACTION_TO_CREATE);
                          });
                    }

                  });
            }
        )
        .catch(() => {
          res.sendStatus(500);
        })
  }

  static getById(req, res) {
    TransactionService.findById(req.params.id)
        .then(transaction => {
          if (transaction.id !== req.params.id) {
            res.sendStatus(403);
            return;
          }
          res.status(200).json(transaction);
        })
        .catch(() => res.sendStatus(500));

  }

  static deleteById(req, res) {
    TransactionService.deleteById(req.params.id)
        .then(() => {
          res.sendStatus(200);
        })
        .catch(() => res.sendStatus(500));

  }
}

module.exports = TransactionController;