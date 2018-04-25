import { Component } from 'react';
import { NavItem, Nav, PageHeader, Button } from 'react-bootstrap';
import TransactionCreateModal from "../components/modals/TransactionCreateModal";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showCreateTransactionModal: false
    };
  }

  render() {
    return <PageHeader className="main-header">
      Money accounting system
      <Button onClick={() => this.setState({ showCreateTransactionModal: true })}>
        Add transactions
      </Button>
      <TransactionCreateModal show={this.state.showCreateTransactionModal}
                              closeModal={() => this.setState({ showCreateTransactionModal: false })}/>
    </PageHeader>;
  }
}

export default Header;
