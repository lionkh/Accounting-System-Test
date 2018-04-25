import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

class TransactionCreateModal extends Component {
  render() {
    return (
        <div>
          <Modal show={this.props.show}>
            <Modal.Header>
              <Modal.Title>Modal title</Modal.Title>
            </Modal.Header>

            <Modal.Body>One fine body...</Modal.Body>

            <Modal.Footer>
              <Button onClick={this.props.closeModal}>Close</Button>
              <Button bsStyle="primary">Save changes</Button>
            </Modal.Footer>
          </Modal>
        </div>
    );
  }
}

TransactionCreateModal.propTypes = {};

export default TransactionCreateModal;
