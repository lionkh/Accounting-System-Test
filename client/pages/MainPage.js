import { Component } from 'react';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { bindActionCreators } from "redux";
import { Button } from 'react-bootstrap';

import * as transactionActions from "../actions/transactions";

import TransactionList from "../components/TransactionList";
import TransactionCreateModal from "../components/modals/TransactionCreateModal";

class MainPage extends Component {
  static propTypes = {
    transactions: PropTypes.object,
    actions: PropTypes.object
  };

  static defaultProps = {
    transactions: [],
    actions: {}
  };

  constructor(props) {
    super(props);
    this.state = {
      showCreateTransactionModal: false
    };
  }

  render() {
    return <div className="main-page">
      <div className="create-transaction-block">
        <Button onClick={() => this.setState({ showCreateTransactionModal: true })}>
          Add transaction
        </Button>
      </div>
      <TransactionList transactions={this.props.transactions.data}
                       deleteTransaction={this.props.actions.deleteTransaction}/>
      <TransactionCreateModal show={this.state.showCreateTransactionModal}
                              createTransaction={this.props.actions.createTransaction}
                              closeModal={() => this.setState({ showCreateTransactionModal: false })}/>
    </div>
  }
}

export default connect(
    state => ({
      transactions: state.transactions
    }),
    dispatch => ({
      actions: bindActionCreators({ ...transactionActions }, dispatch)
    })
)(MainPage);