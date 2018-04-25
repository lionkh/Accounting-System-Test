export default class Transaction {
  constructor(data = {}) {
    this.id = data.id || Math.random();
    this.type = data.type;
    this.amount = data.amount;
    this.effectiveDate = data.effectiveDate;
  }
}