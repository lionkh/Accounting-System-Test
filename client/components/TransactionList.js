import React, { Component } from 'react';
import { ListGroup } from 'react-bootstrap';
import PropTypes from 'prop-types';
import TransactionListItem from "./TransactionListItem";

class TransactionList extends Component {
  static propTypes = {};

  render() {
    return (
        <ListGroup>
          {
            this.props.transactions.map(item => <TransactionListItem key={item.id} transaction={item}/>)
          }
        </ListGroup>

    );
  }
}


export default TransactionList;
