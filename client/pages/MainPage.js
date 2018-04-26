import { Component } from 'react';

import TransactionList from "../components/TransactionList";
import { fetchTransactions } from "../api/transactions";

class MainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      transactions: []
    };
  }

  async componentDidMount() {
    try {
      const TRANSACTIONS = await fetchTransactions();

      this.setState({
        transactions: TRANSACTIONS
      });
    }
    catch (error) {
    }
  }

  render() {
    return <div className="main-page">
      <TransactionList transactions={this.state.transactions}/>
    </div>
  }
}

export default MainPage;