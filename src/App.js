import React, { Component } from 'react';
import './App.css';
import logo from './logo.png'
import cart from './cart.png'
import {
  BrowserRouter as Router,
  Link,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import * as routes from './constants/routes';
import SignUp from './SignUp';
import SignIn from './SignIn';
import List from './List'
import { firebase, auth, firestore } from './firebase';

document.body.style.background = "#e9eff5"

const UnauthenticatedHomeContent = () => {
  return (
    <React.Fragment>
      <p style={{    
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 25,
    marginLeft: 250,
    marginRight: 250
    }} >
        
        Welcome! Thank you for trying to help our community in these trying times. With Shopping Buddy,
        we make it easy for you to help people in need. Simply <Link to={routes.SIGN_UP_PATH}>sign up</Link>, and be taken to a page with people who
        need help. Then click help, and open up a maps page to see directions to get groceries and where to drop them off.
        Some people can't afford to go out right now and by signing up to help, you are making a difference in their lives.

        {/* Welcome, please <Link to={routes.SIGN_IN_PATH}>sign in</Link> */}
      </p>
      <p style={{    
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 'bold',
    fontSize: 15,
    marginTop: 10,
    marginLeft: 250,
    marginRight: 250
    }}>
      Welcome, please <Link to={routes.SIGN_IN_PATH}>sign in </Link> if you already have an account.
        
      </p>
      <img src={cart} style={{marginTop: 202, marginLeft: 60, }}width={100} height={100}/>
      <img src={cart} style={{marginTop: 202, marginLeft: 60, }}width={100} height={100}/>
      <img src={cart} style={{marginTop: 202, marginLeft: 60, }}width={100} height={100}/>
      <img src={cart} style={{marginTop: 50,  marginRight: 30}} width={250} height={250}/>
      <img src={cart} style={{marginTop: 202, marginLeft: 20, }}width={100} height={100}/>
      <img src={cart} style={{marginTop: 202, marginLeft: 60, }}width={100} height={100}/>
      <img src={cart} style={{marginTop: 202, marginLeft: 60, }}width={100} height={100}/>
    </React.Fragment>
    
  );
};

const AuthenticatedHomeContent = ({ authUser }) => {
  return (
    <React.Fragment>
    <p style={{    
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 25,
    marginLeft: 250,
    marginRight: 250
    }} >
      Welcome back, {authUser.email}! Volunteers like you are making it possible for the world to keep going during this pandemic. 
      If you are ready to volunteer, click on the People in Need tab on the top right to see people you can help.
    </p>
    <img src={cart} style={{marginTop: 302, marginLeft: 60, }}width={100} height={100}/>
    <img src={cart} style={{marginTop: 302, marginLeft: 60, }}width={100} height={100}/>
    <img src={cart} style={{marginTop: 302, marginLeft: 60, }}width={100} height={100}/>
    <img src={cart} style={{marginTop: 150,  marginRight: 30}} width={250} height={250}/>
    <img src={cart} style={{marginTop: 302, marginLeft: 20, }}width={100} height={100}/>
    <img src={cart} style={{marginTop: 302, marginLeft: 60, }}width={100} height={100}/>
    <img src={cart} style={{marginTop: 302, marginLeft: 60, }}width={100} height={100}/>
  </React.Fragment>
    
  );
};

class Home extends Component   {
 
  render() {
    return (
      <AuthContext.Consumer>
        {({ authUser }) =>
          <div >
            <h1>Home</h1>
            {!authUser && <UnauthenticatedHomeContent />}
            {authUser && <AuthenticatedHomeContent authUser={authUser} />}

        </div>}
      </AuthContext.Consumer>
    );
  }
}

class SignOut extends React.Component {
  signOut = e => {
    if (e && e.preventDefault) {
      e.preventDefault();
    }

    return auth
      .doSignOut()
      .then(response => {
        console.log('successfully signed out', response);
      })
      .catch(err => {
        console.log('failed to sign out', err);
      });
  };

  componentDidMount() {
    this.signOut();
  }

  render() {
    return <Redirect to={routes.HOME_PATH} />;
  }
}

const AuthenticatedNavigation = () => {
  return (
    <React.Fragment>
      <li>
        <Link to={routes.SIGN_OUT_PATH}>Sign Out</Link>
      </li>
    </React.Fragment>
  );
};

const UnauthenticatedNavigation = () => {
  return (
    <React.Fragment>
      <li>
        <Link to={routes.SIGN_UP_PATH}>Sign Up</Link>
      </li>
      <li>
        <Link to={routes.SIGN_IN_PATH}>Sign In</Link>
      </li>
    </React.Fragment>
  );
};
const ListNav = () => {
  return (
    <React.Fragment>
      <li>
        <Link to={routes.LIST_PATH}>People in Need</Link>
      </li>
      
    </React.Fragment>
  );
};
const Navigation = () => {
  return (
    <AuthContext.Consumer>
      {({ authUser }) =>
        <nav>
          <ul>
            <li>
              <Link to={routes.HOME_PATH}>Home</Link>
            </li>
            {authUser && <AuthenticatedNavigation />}
            {!authUser && <UnauthenticatedNavigation />}
            {authUser && <ListNav/>}
          </ul>
        </nav>}
    </AuthContext.Consumer>
  );
};

const AuthContext = React.createContext({ authUser: null });

class AuthProvider extends React.Component {
  state = {
    authUser: null,
  };

  componentDidMount() {
    firebase.auth.onAuthStateChanged(authUser => {
      authUser
        ? this.setState(() => ({ authUser }))
        : this.setState(() => ({ authUser: null }));
    });
  }

  render() {
    return (
      <AuthContext.Provider value={{ authUser: this.state.authUser }}>
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}

class App extends Component {
  
  render() {
    return (
      <AuthProvider>
        <Router>
          <div className="App">
            <header className="App-header">
            <img src={logo} width={150} height={150}/>
            </header>
            <br/>
            <Navigation />
            <Switch>
              <Route exact path={routes.HOME_PATH} component={Home} />
              <Route exact path={routes.SIGN_UP_PATH} component={SignUp} />
              <Route exact path={routes.SIGN_IN_PATH} component={SignIn} />
              <Route exact path={routes.SIGN_OUT_PATH} component={SignOut} />
              <Route exact path={routes.LIST_PATH} component={List} />
            </Switch>
          </div>
        </Router>
      </AuthProvider>
    );
  }
}

export default App;
