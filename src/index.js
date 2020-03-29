import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';
import Edit from './components/Edit';
import Create from './components/Create';
import Show from './components/Show';
import { withScriptjs } from "react-google-maps";
import Map from './Map';
import './style.css';

const Maps = () => {
  const MapLoader = withScriptjs(Map);

  return (
    <MapLoader
      googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyA5TInLLqSnVSS6eWY15PETv-GKustc1jw"
      loadingElement={<div style={{ height: `100%` }} />}
    />
  );
};
ReactDOM.render(
    <Router>
      <div>
        <Route exact path='/' component={App} />
        <Route path='/edit/:id' component={Edit} />
        <Route path='/create' component={Create} />
        <Route path='/show/:id' component={Show} />
        <Route exact path ='/map' component={Maps}/>
      </div>
  </Router>,
     document.getElementById('root'));
registerServiceWorker();
