const uuidv1 = require('uuid/v1');

class Transaction {
  constructor(data = {}) {
    this.id = data.id || uuidv1();
    this.type = data.type;
    this.amount = data.amount;
    this.effectiveDate = data.effectiveDate;
  }
}

module.exports = Transaction;