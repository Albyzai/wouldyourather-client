import React, { Component } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input
} from 'reactstrap';

import { connect } from 'react-redux';
import { createDilemma } from '../actions/dilemmaActions';

class DilemmaModal extends Component {
  state = {
    modal: false,
    title: '',
    red: '',
    blue: '',
    red_votes: 0,
    blue_votes: 0
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  }

  onChange = (e) => {
    this.setState({ [e.target.name] : e.target.value })
  }

  onSubmit = (e) => {
    e.preventDefault();

    const newDilemma = {
      title: this.state.title,
      red: this.state.red,
      blue: this.state.blue,
      red_votes: this.state.red_votes,
      blue_votes: this.state.blue_votes
    }

    // Add dilemma via createDilemma action
    this.props.createDilemma(newDilemma);

    // Close Modal
    this.toggle();
  }

  render(){
    return(
      <div>
        <Button
          color="dark"
          style={{marginBottom: '2rem'}}
          onClick={this.toggle}>
          Create Dilemma
          </Button>
          <Modal
            isOpen={this.state.modal}
            toggle={this.toggle}
          >
          <ModalHeader
            toggle={this.toggle}
          >
          Create a new Dilemma
          </ModalHeader>
          <ModalBody>
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for="dilemma">Dilemma</Label>
                <Input
                  type="text"
                  name="title"
                  id="title"
                  placeholder="Title"
                  onChange={this.onChange} />
                <Input
                  type="text"
                  name="red"
                  id="red"
                  placeholder="Red Dilemma"
                  style={{marginTop: '2rem'}}
                  onChange={this.onChange} />

                <Input
                  type="text"
                  name="blue"
                  id="blue"
                  placeholder="Blue Dilemma"
                  style={{marginTop: '2rem'}}
                  onChange={this.onChange} />
                  
                  <Button
                    color="dark"
                    style={{marginTop: '2rem'}}
                    block>
                    Create Dilemma
                  </Button>


              </FormGroup>
            </Form>
          </ModalBody>

          </Modal>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  dilemma: state.dilemma
});

export default connect(mapStateToProps, {createDilemma})(DilemmaModal)