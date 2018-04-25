import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Form, FormControl, Modal } from 'react-bootstrap';
import { SimpleSelect } from 'react-selectize';

import Transaction from "../../models/Transaction";

import { getCurrentDate } from "../../utils/timeStampUtils";

class TransactionCreateModal extends Component {
  static propTypes = {
    show: PropTypes.bool,
    createTransaction: PropTypes.func,
    closeModal: PropTypes.func
  };

  static defaultProps = {
    show: false,
    createTransaction: () => {},
    closeModal: () => {}
  };

  constructor(props) {
    super(props);
    this.state = {
      type: {},
      amount: '',
      errors: {
        type: false,
        amount: false
      }
    };
  }

  setTransactionType(type) {
    if (type) {
      this.setState({
        type
      });
    } else {
      this.setState({
        type: {}
      });
    }
  }

  setTransactionAmount(event) {
    const regExp = /^[0-9\b]+$/;

    if (event.target.value === '' || regExp.test(event.target.value)) {
      this.setState({ amount: event.target.value })
    }
  }

  createTransaction(event) {
    event.preventDefault();
    if (this.state.type.value && this.state.amount) {
      const TRANSACTION = new Transaction({
        type: this.state.type.value,
        amount: this.state.amount,
        effectiveDate: getCurrentDate()
      });

      this.setState({
        type: {},
        amount: ''
      });
      this.props.createTransaction(TRANSACTION);
      this.props.closeModal();
    } else {
      const STATE = this.state;

      if (!STATE.type.value) {
        STATE.errors.type = true;
      }
      if (!STATE.amount) {
        STATE.errors.amount = true;
      }
      this.setState(prevState => ({
        ...prevState,
        errors: STATE.errors
      }));
    }
  }

  closeModal() {
    this.setState({
      type: {},
      amount: ''
    });
    this.props.closeModal();
  }

  render() {
    return (
        <div>
          <Modal show={this.props.show}>
            <Form onSubmit={::this.createTransaction}>
              <Modal.Header>
                <Modal.Title>Create Transaction</Modal.Title>
              </Modal.Header>

              <Modal.Body>
                <h4>Chose transaction type:</h4>
                <SimpleSelect
                    value={this.state.type}
                    options={["credit", "debit"].map(item => ({
                      label: item.slice(0, 1).toUpperCase() + item.slice(1),
                      value: item
                    }))}
                    onValueChange={::this.setTransactionType}/>
                <h4>Enter transaction amount:</h4>
                <FormControl value={this.state.amount} onChange={::this.setTransactionAmount}/>

              </Modal.Body>

              <Modal.Footer style={{ textAlign: 'center' }}>
                <Button bsStyle="danger" onClick={::this.closeModal}>Close</Button>
                <Button
                    disabled={this.state.errors.type || this.state.errors.amount || !this.state.type.value || !this.state.amount || +this.state.amount === 0}
                    type="submit"
                    bsStyle="success">Submit</Button>
              </Modal.Footer>
            </Form>
          </Modal>
        </div>
    );
  }
}

export default TransactionCreateModal;
