import React, { Component } from 'react';
import firebase from '../firebase/firebase';
import { Link } from 'react-router-dom';

class Edit extends Component {

  constructor(props) {
    super(props);
    this.state = {
      key: '',
      Product: '',
      Amount: ''
    };
  }

  componentDidMount() {
    const ref = firebase.firestore().collection('board').doc(this.props.match.params.id);
    ref.get().then((doc) => {
      if (doc.exists) {
        const board = doc.data();
        this.setState({
          key: doc.id,
          Product: board.Product,
          Amount: board.Amount
        });
      } else {
        console.log("No such document!");
      }
    });
  }

  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState({board:state});
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { Product, Amount } = this.state;

    const updateRef = firebase.firestore().collection('board').doc(this.state.key);
    updateRef.set({
      Product,
      Amount
    }).then((docRef) => {
      this.setState({
        key: '',
        Product: '',
        Amount: ''
      });
      this.props.history.push("/show/"+this.props.match.params.id)
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
  }

  render() {
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">
              EDIT ITEMS
            </h3>
          </div>
          <div class="panel-body">
            <h4><Link to={`/show/${this.state.key}`} class="btn btn-primary">Product List</Link></h4>
            <form onSubmit={this.onSubmit}>
              <div class="form-group">
                <label for="Prpduct">Product:</label>
                <input type="text" class="form-control" name="Prpduct" value={this.state.Product} onChange={this.onChange} placeholder="Product" />
              </div>
              <div class="form-group">
                <label for="Amount">Amount:</label>
                <input type="text" class="form-control" name="Amount" value={this.state.Amount} onChange={this.onChange} placeholder="Amount" />
              </div>
              <button type="submit" class="btn btn-success">Submit</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Edit;