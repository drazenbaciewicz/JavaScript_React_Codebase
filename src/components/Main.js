// This is the 'main' controller file
// While the React Router does most of the control, this is the core system control

import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

// Cookie management
import Cookies from 'js-cookie';

// Importing our other components to be used
import LoginScreen from './Login/LoginScreen';
import LoadingScreen from './Login/LoadingScreen';
import Dashboard from './Dashboard/Dashboard';

// Loading image
import wallpaper from '../assets/img/wallpaper_mountains.jpg';

// Importing CSS (just main)
import '../css/Main.css';
import '../css/Font.css';

export default class Main extends React.Component {

  constructor(props) {
    super(props);

    // Credentials is a variable that contains all of the credentials for the back end
    // If credentials is non-existant, it will display the login screen
    // Please do not alter credentials directly, thank you

    // Loading determines whether or not we are loading something
    // Simply set loading to true...
    this.state = {
      credentials: null,
      loading: true
    }

    // Holding log-in
    this.loadLoginCredentials = this.loadLoginCredentials.bind(this);
    this.logOut = this.logOut.bind(this);
  }

  // Credentials processor
  loadLoginCredentials(credentials) {

    // Saving to cookies...
    let employee_auth = credentials.employee_auth;
    let employee_id = credentials.employee_id;
    let employee_name = credentials.employee_name;

    Cookies.set('employee_auth', employee_auth, { expires: 7 });
    Cookies.set('employee_id', employee_id, { expires: 7 });
    Cookies.set('employee_name', employee_name, { expires: 7 });

    // Setting state
    this.setState({ credentials: credentials })
  }

  // Function for deleting cookies and logging out entirely
  logOut() {

    // Getting notifications
    let ref = this;

    // Creating the message
    let data = {
      'employee_auth': this.state.credentials['employee_auth'],
      'employee_id': this.state.credentials['employee_id']
    };
    data['employee_status'] = 'inactive';

    fetch('http://159.65.71.123:5000/employee/status/set', {
      method: 'post',
      body: JSON.stringify(data)
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (myJson) {
        console.log(myJson);

      });

    // Deleting cookies
    Cookies.remove('employee_auth');
    Cookies.remove('employee_id');
    Cookies.remove('employee_name');

    // Setting state
    this.setState({ credentials: null, loading: true });

    // Reloading the page

    setTimeout(function () {
      ref.setState({ loading: false })
    }, 500);
  }

  componentWillMount() {
    //alert("Checking for cookies that have stored our credentials...");

    // Loading from cookies
    let token = Cookies.get('employee_auth');
    let employee_id = Cookies.get('employee_id');
    let employee_name = Cookies.get('employee_name');

    // Checking if these cookies are valid
    if (token != null && token != undefined && token.length > 0) {
      // We gucchi fam
      let credentials = {
        employee_auth: token,
        employee_id: employee_id,
        employee_name: employee_name
      }

      this.setState({ credentials: credentials });
      setTimeout(() => {
        this.setState({ loading: false })
      }, 1000);
      return;
    }

    setTimeout(() => {
      this.setState({ loading: false })
    }, 1000);
  }

  render() {

    if (this.state.loading) {
      // Displaying the loading screen
      // This allows us to spend some time fetching from the cookies in case that takes awhile...
      return (
        <div className="main_container">
          <LoadingScreen />
        </div>
      )
    }

    if (this.state.credentials == null)
      return (
        <div className="main_container">
          <img src={ wallpaper } alt="logo" className="wallpaper_image" />
          <LoginScreen loadLoginCredentials={ this.loadLoginCredentials } />
        </div>
      )

    else
      return (
        <div className="main_container">
          <Dashboard logOut={ this.logOut } credentials={ this.state.credentials } />
        </div>

      )
  }
}
