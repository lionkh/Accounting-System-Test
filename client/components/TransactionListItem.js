import React, { Component } from 'react';
import { ListGroupItem, Panel } from 'react-bootstrap';
import PropTypes from 'prop-types';
import moment from 'moment';

import Transaction from '../models/Transaction';

class TransactionListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showFullInformation: false
    };
  }

  static propTypes = {
    transaction: Transaction
  };

  static defaultProps = {
    transaction: new Transaction()
  };

  render() {
    const { transaction } = this.props;

    return (
        <ListGroupItem
            color={!this.state.showFullInformation ? (transaction.type === 'credit' ? 'warning' : 'info') : ''}
            className="m-5">
          <Panel>
            <Panel.Heading
                onClick={() => this.setState(prevState => ({ showFullInformation: !prevState.showFullInformation }))}
                className="text-center">Transaction #{transaction.id}</Panel.Heading>
            {
              this.state.showFullInformation && <Panel.Body>
                <h4>Date: {moment(transaction.amount).format('MMMM Do YYYY, h:mm:ss a')}</h4>
                <h4>Amount: {transaction.amount}</h4>
              </Panel.Body>
            }
          </Panel>
        </ListGroupItem>
    );
  }
}

export default TransactionListItem;
