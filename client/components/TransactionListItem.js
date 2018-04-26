import React, { Component } from 'react';
import { ListGroupItem, Panel, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

import Transaction from '../models/Transaction';

import { getHumanDate } from "../utils/timeStampUtils";

class TransactionListItem extends Component {
  static propTypes = {
    transaction: Transaction,
    key: PropTypes.number
  };

  static defaultProps = {
    transaction: new Transaction(),
    key: Math.random()
  };

  constructor(props) {
    super(props);
    this.state = {
      showFullInformation: false
    };
  }

  render() {
    const { transaction } = this.props;

    return (
        <ListGroupItem
            className={`transaction-item ${transaction.type === 'credit' ? 'credit' : 'debit'}`}>
          <Panel>
            <Panel.Heading
                onClick={() => this.setState(prevState => ({ showFullInformation: !prevState.showFullInformation }))}
                className="text-center">Transaction #{transaction.id}</Panel.Heading>
            {
              this.state.showFullInformation && <Panel.Body>
                <h4>Type: {transaction.type}</h4>
                <h4>Date: {getHumanDate(transaction.effectiveDate)}</h4>
                <h4>Amount: {transaction.amount}</h4>
              </Panel.Body>
            }
          </Panel>
        </ListGroupItem>
    );
  }
}

export default TransactionListItem;
