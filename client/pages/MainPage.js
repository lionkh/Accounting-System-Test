import { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as transactionActions from "../actions/transactions";

import TransactionList from "../components/TransactionList";

class MainPage extends Component {
  static propTypes = {};
  static defaultProps = {};

  render() {
    return <div className="main-page">
      <TransactionList transactions={this.props.transactions.data}/>
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