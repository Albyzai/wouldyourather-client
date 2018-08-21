import React, { Component } from 'react';
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import uuid from 'uuid';
import { connect } from 'react-redux';
import { getDilemmas, deleteDilemma } from '../actions/dilemmaActions';
import PropTypes from 'prop-types';


class DilemmaList extends Component {

  componentDidMount(){
    this.props.getDilemmas();
  }

  onDeleteClick = (id) => {
    this.props.deleteDilemma(id);
  }
  render() {
    const { dilemmas } = this.props.dilemma;

    return(
      <Container>
        <Button 
          color="dark" 
          style={{marginBottom: '2rem'}}
          onClick={() => {
            const title = prompt('Enter Dilemma');
            if(title){
              this.setState(state => ({
                dilemmas: [...state.dilemmas, { id: uuid(), title }]
              }));
            }
          }}>Add Dilemma</Button>

          <ListGroup>
            <TransitionGroup className="dilemma-list">
              {dilemmas.map(({_id, title}) => (
                <CSSTransition key={_id} timeout={500} classNames="fade">
                  <ListGroupItem>
                    <Button
                      className="remove-btn"
                      color="danger"
                      size="sm"
                      onClick={this.onDeleteClick.bind(this, _id)}>&times;</Button>
                    {title}
                  </ListGroupItem>
                </CSSTransition>
              ))}
            </TransitionGroup>
          </ListGroup>
      </Container>
    );
  }
}

DilemmaList.propTypes = {
  getDilemmas: PropTypes.func.isRequired,
  dilemma: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  dilemma: state.dilemma
});

export default connect(mapStateToProps, { getDilemmas, deleteDilemma})(DilemmaList);