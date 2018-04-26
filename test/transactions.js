process.env.NODE_ENV = 'test';

const Transaction = require('../server/models/Transaction');
const TransactionController = require('../server/controllers/TransactionController');
const TransactionService = require('../server/services/TransactionService');

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server/server');
const should = chai.should();
const config = require('../server/config/index');

chai.use(chaiHttp);
describe('Transactions', () => {
  beforeEach(done => {
    TransactionService.updateStorageValue('transactions', [])
        .then(() => {
          TransactionService.updateStorageValue('amount', 0)
              .then(() => {
                done();
              });
        });
  });

  describe('/GET transaction', () => {
    it('it should GET all the transactions', done => {
      chai.request(server)
          .get(`${config.apiPrefix}${TransactionController.prefix}`)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('array');
            res.body.length.should.be.eql(0);
            done();
          });
    });
  });

  describe('/POST transaction', () => {
    it('it should POST a transaction ', done => {
      const TRANSACTION = JSON.stringify(
          {
            type: "debit",
            amount: "1000"
          }
      );

      chai.request(server)
          .post(`${config.apiPrefix}${TransactionController.prefix}`)
          .send({ transaction: TRANSACTION })
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.transaction.should.have.property('id');
            res.body.transaction.should.have.property('type');
            res.body.transaction.should.have.property('amount');
            res.body.transaction.should.have.property('effectiveDate');
            res.body.should.have.property('message').eql('success');
            done();
          });
    });
  });


  describe('/POST transaction', () => {
    it('it should fail because global amount would be negative ', done => {
      const TRANSACTION = JSON.stringify(
          {
            type: "credit",
            amount: "100"
          }
      );

      TransactionService.updateStorageValue('amount', 0);
      chai.request(server)
          .post(`${config.apiPrefix}${TransactionController.prefix}`)
          .send({ transaction: TRANSACTION })
          .end((err, res) => {
            res.should.have.status(500);
            res.body.should.be.a('object');
            res.body.should.have.property('error');
            res.body.error.message.should.eql('Invalid amount!');
            done();
          });
    });
  });

  describe('/POST transaction', () => {
    it('it should fail because there are no required fields in the transaction obejct ', done => {
      const TRANSACTION = JSON.stringify({});

      chai.request(server)
          .post(`${config.apiPrefix}${TransactionController.prefix}`)
          .send({ transaction: TRANSACTION })
          .end((err, res) => {
            res.should.have.status(500);
            res.body.should.be.a('object');
            res.body.should.have.property('error');
            res.body.error.message.should.eql('Enter all required fields!');
            done();
          });
    });
  });

  describe('/GET/:id transaction', () => {
    it('it should GET a transaction by the given id', done => {
      const TRANSACTION = new Transaction({ id: '1', type: "debit", amount: "10" });

      TransactionService.updateStorageValue('transactions', [TRANSACTION])
          .then(() => {
            chai.request(server)
                .get(`${config.apiPrefix}${TransactionController.prefix}/${TRANSACTION.id}`)
                .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('object');
                  res.body.should.have.property('amount');
                  res.body.should.have.property('type');
                  res.body.should.have.property('id').eql(TRANSACTION.id);
                  done();
                });
          })
    });
  });

  describe('/DELETE/:id transaction', () => {
    it('it should DELETE a transaction by the given id', done => {
      const TRANSACTION = new Transaction({ id: '1', type: "debit", amount: "10" });

      TransactionService.updateStorageValue('transactions', [TRANSACTION])
          .then(() => {
            chai.request(server)
                .delete(`${config.apiPrefix}${TransactionController.prefix}/${TRANSACTION.id}`)
                .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('object');
                  res.body.should.have.property('message').eql('Transaction deleted.');
                  done();
                });
          });
    });
  });
});