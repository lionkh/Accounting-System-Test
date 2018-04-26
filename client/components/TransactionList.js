import React, { Component } from 'react';
import { ListGroup } from 'react-bootstrap';
import PropTypes from 'prop-types';
import TransactionListItem from "./TransactionListItem";

class TransactionList extends Component {
  static propTypes = {
    transactions: PropTypes.array
  };

  static defaultProps = {
    transactions: []
  };


  render() {
    return (
        <ListGroup className="transaction-list">
          {
            this.props.transactions.map(item => <TransactionListItem key={item.id} transaction={item}/>).reverse()
          }
        </ListGroup>
    );
  }
}


export default TransactionList;
