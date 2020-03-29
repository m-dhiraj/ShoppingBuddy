import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './App.css';
//import Stores from './components/Stores'
import firebase from './firebase/firebase';
import Stores from './components/Stores';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button
  } from 'reactstrap';
  import { render } from 'react-dom';
import { withScriptjs } from "react-google-maps";
import Map from './Map';
import './style.css';
import * as routes from './constants/routes';

class List extends Component {
    constructor(props) {
        super(props);
        this.ref = firebase.firestore().collection('board');
        this.unsubscribe = null;
        this.state = {
          boards: [],
          ids:[],
          page:0
        };
      }
    
      onCollectionUpdate = (querySnapshot) => {
        const boards = [];
        querySnapshot.forEach((doc) => {
          const { Product, Amount } = doc.data();
          boards.push({
            key: doc.id,
            doc, // DocumentSnapshot
            Product,
            Amount
          });
        });
        this.setState({
          boards
       });
      }
    
      componentDidMount() {
        this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
      }
    
      render() {
        const { ids } = this.state;
        if(this.state.page==0){
            return (
              <div class="container">
                <div class="panel panel-default">
                  <div class="panel-heading">
                    <h3 class="panel-title">
                      People
                    </h3>
                  </div>
                  <div class="panel-body">
                    
                    
                    <Card body>
                    <CardTitle>Ben</CardTitle>
                    <CardText>Lives 10 miles away</CardText>
                    <CardText>Needs 26 items</CardText>
                    <Button onClick={() => this.setState({page:1})}>Help</Button>
                </Card>
                <Card body className="text-center">
                <CardTitle>Barak</CardTitle>
                <CardText>Lives 15 miles away</CardText>
                    <CardText>Needs 15 items</CardText>
                    <Button onClick={() => this.setState({page:1})}>Help</Button>
                </Card>
                <Card body className="text-center">
                <CardTitle>Jeb</CardTitle>
                <CardText>Lives 17 miles away</CardText>
                    <CardText>Needs 21 items</CardText>
                    <Button onClick={() => this.setState({page:1})}>Help</Button>
                </Card>
                <br/>
                <Button onClick={() => this.setState({page:1})}>Back</Button>
                  </div>
                </div>
              </div>
            );
                        
                        }
          if(this.state.page==1){
        return (
          <div class="container">
            <div class="panel panel-default">
              <div class="panel-heading">
                <h3 class="panel-title">
                  SHOPPING LIST
                </h3>
              </div>
              <div class="panel-body">
                <table class="table table-stripe">
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.boards.map(board =>
                      <tr>
                        <td><Link to={`/show/${board.key}`}>{board.Product}</Link></td>
                        <td>{board.Amount}</td>
                      </tr>
                    )}
                  </tbody>
                </table>
                <Link  to={routes.MAP_PATH}>Continue</Link>

              </div>
            </div>
          </div>
        );
                    
                    }

                   

                                    


      }
}

export default List;
