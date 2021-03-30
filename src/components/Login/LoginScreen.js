import React from 'react';

// Importing animation library
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'; // ES6

// Importing hashing
import sha512 from 'js-sha512';

// Importing the CSS
import '../../css/Login/LoginScreen.css';

// Loading the normal Material UI
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import AlarmOn from '@material-ui/icons/AlarmOn';

import CircularProgress from '@material-ui/core/CircularProgress';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

// Loading image
import wallpaper from '../../assets/img/wallpaper_mountains.jpg';
import logo_image from '../../assets/img/logo.png';
import logo_2fa from '../../assets/img/img_2fa.png';
import logo_tech_support from '../../assets/img/logo_tech_support.png';
import {ClockIn} from '../ClockIn';
import PasswordReset from './PasswordReset';
import LoadingScreen from '../LoadingScreen';

export default class LoginScreen extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            displayLogin: false,
            displayLoadingScreen: false,
            display_2fa: false,
            display_welcome: false,
            phone_number_2fa: '0000',

            resetPassword: false,
            resetPasswordQuery: null,
            resetPasswordKey: null,
            last4OfPhone: '',

            input_2fa: ['', '', '', '', '', ''],
            input_2fa_element: null,
            username: '',
            password: '',
            user: null,
            display_dialog: false,

            login_error: '',

            dialog_display: {
                dialog_signed: false,
                dialog_reset: false,
                dialog_admin: false
            }
        }

        this.attemptLogIn = this.attemptLogIn.bind(this);
        this.setPassword = this.setPassword.bind(this);
        this.setUsername = this.setUsername.bind(this);
        this.clockIn = this.clockIn.bind(this);
    }

    toggleResetPassword = async () => {
        const {resetPassword} = this.state;
        this.setState({resetPassword: !resetPassword})
    };

    // Attempting 2fa log-in
    attemptLogIn2FA() {
        console.log('Attempting 2fa log-in');
        this.setState({displayLogin: false, display_2fa: false, displayLoadingScreen: true});
        this.attemptLogIn()
    }

    setUsername(username) {
        this.setState({username});
    }

    setPassword(password) {
        this.setState({password});
    }

    toggleLoadingScreen = async () => {
        const {displayLoadingScreen} = this.state;
        this.setState({displayLoadingScreen: !displayLoadingScreen})
    };

    // Building out the ability to display the login after 1/2 a second
    // For prettiness reasons
    componentDidMount() {
        let ref = this;
        setTimeout(() => {
            ref.setState({displayLogin: true});
        }, 500)
    }

    // Forcing to build the original 2fa list
    componentWillMount() {
        let built_2fa = []
        let ref = this;
        for (let i = 0; i < 6; i++) {

            let new_textfield = (<TextField
                className="text_field2fa"
                id="filled-name"
                margin="normal"
                variant="filled"
                autoFocus={i === 0}
                inputProps={{
                    style: {fontSize: 55, textAlign: 'center'},
                    maxLength: 1
                }}
                value={''}
                key={i}
                onChange={(e) => {
                    ref.set2fainput(i, e.target.value)
                }}
            />);

            built_2fa[i] = new_textfield;
        }

        this.setState({input_2fa_element: built_2fa});
    }

    set2fainput(index, input) {
        console.log('Setting 2fa at ' + index + ' to ' + input);
        let current_2fa = this.state.input_2fa;

        // Checking if its numeric
        if (isNaN(input)) {
            return;
        }

        current_2fa[index] = input;

        let built_2fa = []
        let ref = this;
        for (let i = 0; i < 6; i++) {

            let new_textfield = <TextField
                className="text_field2fa"
                id="filled-name"
                margin="normal"
                variant="filled"
                autoFocus={i === (index + 1)}
                inputProps={{
                    style: {fontSize: 55, textAlign: 'center'},
                    maxLength: 1
                }}
                value={current_2fa[i]}
                key={i}
                onChange={(e) => {
                    ref.set2fainput(i, e.target.value)
                }}
            />

            built_2fa[i] = new_textfield;
        }

        this.setState({input_2fa: current_2fa, input_2fa_element: built_2fa});
    }

    // Defining if we need to login with 2fa
    loginRequire2fa(phone_number) {
        console.log('Dispalying the 2fa log-in');
        this.setState({display_2fa: true, displayLoadingScreen: false, phone_number_2fa: phone_number});
    }

    // Basic login attempt
    async attemptLogIn() {
        const {username, password, input_2fa, display_2fa} = this.state;

        console.log('Attempting to log in');
        this.setState({displayLogin: false, displayLoadingScreen: true});

        // Performing the fetch
        // Looks like our system is telling us in order to log in, we need to 2fa it up
        // Calling that function
        console.log('Logging in with username of ' + username);

        // Building the login body
        const login_body = {username, password};

        // Checking if someone entered a 2fa
        let code_2fa = input_2fa.join('');
        if (code_2fa.length === 6) {
            login_body['2fa_code'] = code_2fa;
        }

        // Saving our local object
        let ref = this;

        const response = await fetch(`${window.REACT_APP_API_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(login_body)
        });

        const json_response = await response.json();

        if (response.ok) {
            // Login success!
            const display_2fa_screen = json_response.user.require_2fa && !('2fa_code' in login_body);
            this.setState({
                display_welcome: false,
                displayLogin: false,
                displayLoadingScreen: false,
                display_2fa: display_2fa_screen,
                user: json_response['user']
            });
            let login_credentials = json_response['user']['token'];
            this.setState({temporary_credential_holder: login_credentials});

            if (!display_2fa_screen || !json_response.user.require_2fa) {
                this.props.loadLoginCredentials(this.state.temporary_credential_holder)
            }
        } else {
            ref.setState({
                login_error: json_response['message'],
                displayLogin: true,
                displayLoadingScreen: false
            })
        }
    }

    clockIn() {

        let ref = this;

        this.setState({display_welcome: false, displayLoadingScreen: false,});
        setTimeout(() => {
            ref.props.loadLoginCredentials(ref.state.temporary_credential_holder);
        }, 500);
    }

    //function for handling Enter key press
    handleEnterKeyPress = (keyPressed) => {
        if (keyPressed.key === 'Enter') {
            this.attemptLogIn();
        }
        /*else if (keyPressed.key >= '0' || keyPressed.key <= '9'){
            this.focus;
        }*/
    }

    // Function for handling dialog display
    setDialogDisplay(display_type, display_value, close_target) {
        let new_dialog_display = this.state.dialog_display;
        new_dialog_display[display_type] = display_value;
        if (close_target !== undefined && close_target !== null && close_target.length > 0)
            new_dialog_display[close_target] = false;

        this.setState({dialog_display: new_dialog_display});
        ///** close some dialogs here */
    }


    render() {
        const {display_2fa, displayLoadingScreen, username, password, user, resetPassword} = this.state;
        let screen = null;

        // Loading dots for the login screen...
        let logging_in_buttons = this.state.loginDotDisplay;

        // Assigning variable for animations
        var ReactCSSTransitionGroup = require('react-addons-css-transition-group'); // ES5 with npm

        // Displaying error
        let error_div = null;
        if (this.state.login_error.length > 0) {
            error_div = <div className="login_error">{this.state.login_error}</div>
        }

        // Determining whether or not to display login, depending on animation rules
        let display_login_obj = null;
        if (!resetPassword && !display_2fa) {

            // Determining whether or not to 'lock' our login buttons
            let input_disabled = false;
            if (password.length <= 0 || username.length <= 0) {
                input_disabled = true;
            }

            display_login_obj =
                <div className="login_main_text">
                    <img src={logo_image} alt="logo" className="logo_image"/>

                    {error_div}

                    {/*
                <div className = "current_time_prefix">
                    The current time is
                </div>
                <div className = "current_time_value">
                {current_day}, {current_month} {day_of_month}, {current_year} at {current_time}
                </div>*/}

                    <TextField
                        id="standard"
                        label="Username"
                        className="input_username"
                        type="text"
                        autoComplete="current-username"
                        autoFocus
                        margin="normal"
                        required
                        variant="outlined"
                        value={username}
                        onChange={(e) => {
                            this.setUsername(e.target.value)
                        }}
                        /* inputRef={(x) => {this.username_input_ref = x;}}*/
                        onKeyPress={this.handleEnterKeyPress}
                    />

                    <TextField
                        id="standard-password-input"
                        label="Password"
                        className="input_password"
                        type="password"
                        autoComplete="current-password"
                        margin="normal"
                        required
                        variant="outlined"
                        value={password}
                        onChange={(e) => {
                            this.setPassword(e.target.value)
                        }}
                        onKeyPress={this.handleEnterKeyPress}
                    />

                    <Button
                        onClick={() => {
                            this.attemptLogIn()
                        }}
                        variant="contained"
                        color="primary"
                        className="log_in_button"
                        inputRef={(x) => {
                            this.username_input_ref = x;
                        }}
                        disabled={input_disabled}

                    >
                        Log In
                    </Button>


                    <div className="forgot_password" onClick={() => {
                        this.toggleResetPassword()
                        // this.setDialogDisplay('dialog_signed', true)
                    }}>
                        <a>Forgot password? Reset Password</a>
                    </div>

                    <div className="tech_support">
                        <img className="logo_tech_support" src={logo_tech_support} alt="logo_tech_supp"
                             color="primary"/>
                        <div> Technical Support</div>
                        <div> deathstar@blackopsmail.com</div>
                        <div> 619-123-4567</div>
                    </div>

                    <Dialog
                        open={this.state.dialog_display['dialog_signed']}
                        onClose={() => {
                            this.setDialogDisplay('dialog_signed', false)
                        }}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"

                    >
                        <DialogContent>
                            <DialogContentText id="alert-dialog-content">
                                <p className="dialog_description_content">Let's get you signed in!</p>
                                <p className="dialog_description_content_1" color="secondary">Enter your phone number,
                                    email or user ID</p>
                                <input className="forgot_pw_input_email" placeholder="Type here . . . "
                                       color="primary"></input>
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions className="reset_password_footer">
                            <Button className="reset_cancel_button"
                                    onClick={() => this.setDialogDisplay('dialog_signed', false)}>
                                CANCEL
                            </Button>
                            <Button className="reset_dialog_button" onClick={() => {
                                this.setDialogDisplay('dialog_reset', true)
                            }} color="primary">
                                CONTINUE
                            </Button>
                        </DialogActions>
                    </Dialog>

                    <Dialog
                        open={this.state.dialog_display['dialog_reset']}
                        onClose={() => {
                            this.setDialogDisplay('dialog_reset', false)
                        }}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                        fullWidth="400px"
                    >
                        <DialogContent id="dialog_content">
                            <DialogContentText id="alert-dialog-content">
                                <div className="reset_email_sent">We sent a reset link has been sent to <div
                                    className="reset_recovery_email">*****@mail.com.</div></div>
                                <div>This may take a few minutes to arrive.</div>
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions className="reset_password_footer">
                            <DialogContentText>
                                <div> Didn't receive an email? <a className="reset_dialog_highlight_text"
                                                                  onClick={() => this.setDialogDisplay('dialog_reset', false)}>Try
                                    again</a></div>
                                <div> Need assistance? <a className="reset_dialog_try_again"
                                                          onClick={() => this.setDialogDisplay('dialog_admin', true, 'dialog_signed')}>Yes</a>
                                </div>
                            </DialogContentText>
                        </DialogActions>
                    </Dialog>

                    <Dialog
                        open={this.state.dialog_display['dialog_admin']}
                        onClose={() => {
                            this.setDialogDisplay('dialog_admin', false)
                        }}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogContent id="dialog_content">
                            <DialogContentText id="alert-dialog-content">
                                <div className="dialog_description_content_1">Notify your administrator?</div>
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions className="reset_password_footer">
                            <Button className="reset_cancel_button"
                                    onClick={() => this.setDialogDisplay('dialog_admin', false, 'dialog_reset')}>
                                Cancel
                            </Button>
                            <Button className="reset_dialog_button"
                                    onClick={() => this.setDialogDisplay('dialog_admin', false, 'dialog_reset')}>
                                OK
                            </Button>
                        </DialogActions>
                    </Dialog>

                </div>
        }

        // Do we display welcome?
        let display_welcome = null;
        if (this.state.display_welcome) {
            display_welcome = <ClockIn user={user} clockIn={this.clockIn.bind(this)}/>
        }

        let display_login_2fa = null;
        // Do we need to perform some 2fa?
        if (this.state.display_2fa) {

            // Checking if we have all of the 2fa data
            let input_disabled = false;
            for (let i = 0; i < 6; i++) {
                if (this.state.input_2fa[i].length <= 0) {
                    input_disabled = true;
                }
            }

            display_login_2fa =
                <div className="login_main_text">
                    <img src={logo_2fa} alt="logo" className="logo_2fa"/>

                    <div className="digitCodeHeader">
                        Enter the 6 digit code that has been sent to
                    </div>

                    <div className="phoneNumber2fa">
                        (***) ***-{user.last_4_of_phone}
                    </div>

                    <div className="text_field2fa_holder">
                        {this.state.input_2fa_element}
                    </div>

                    <Button
                        onClick={() => {
                            this.attemptLogIn2FA()
                        }}
                        variant="contained"
                        color="primary"
                        className="log_in_button"
                        disabled={input_disabled}

                    >
                        Log In
                    </Button>

                </div>
        }

        // // Determining whether or not to display the login loader screen
        // let display_login_attempt = null;
        // if (this.state.displayLoadingScreen) {
        //   display_login_attempt =
        //     <div className="login_main_text">
        //       <img src={ logo_image } alt="logo" className="logo_image" />
        //
        //       <div className="loginProgressHolder">
        //         <CircularProgress className="loginProgress" size={ 80 } thickness={ 5 } />
        //       </div>
        //     </div>
        // }

        console.log(resetPassword, displayLoadingScreen)
        return (
            <div className="loginScreen_container">

                <ReactCSSTransitionGroup
                    transitionName="example"
                    transitionAppear={true}
                    transitionAppearTimeout={1500}
                    transitionEnter={true}
                    transitionLeave={true}>
                    <PasswordReset disabled={!resetPassword} loadingScreen={this.toggleLoadingScreen}
                                   onComplete={this.toggleResetPassword}/>
                </ReactCSSTransitionGroup>

                <ReactCSSTransitionGroup
                    transitionName="example"
                    transitionAppear={true}
                    transitionAppearTimeout={1500}
                    transitionEnter={true}
                    transitionLeave={true}>
                    {screen}
                </ReactCSSTransitionGroup>

                <ReactCSSTransitionGroup
                    transitionName="example"
                    transitionAppear={true}
                    transitionAppearTimeout={1500}
                    transitionEnter={true}
                    transitionLeave={true}>
                    {display_login_obj}
                </ReactCSSTransitionGroup>

                <ReactCSSTransitionGroup
                    transitionName="example"
                    transitionAppear={true}
                    transitionAppearTimeout={1500}
                    transitionEnter={true}
                    transitionLeave={true}>
                    <LoadingScreen disabled={!displayLoadingScreen}/>
                </ReactCSSTransitionGroup>

                <ReactCSSTransitionGroup
                    transitionName="example"
                    transitionAppear={true}
                    transitionAppearTimeout={1500}
                    transitionEnter={true}
                    transitionLeave={true}>
                    {display_login_2fa}
                </ReactCSSTransitionGroup>

                <ReactCSSTransitionGroup
                    transitionName="example"
                    transitionAppear={true}
                    transitionAppearTimeout={1500}
                    transitionEnter={true}
                    transitionLeave={true}>
                    {display_welcome}
                </ReactCSSTransitionGroup>


                <div className="login_footer">
                    <div className="middle_text" color="secondary">
                        Copyright 2019 - All Rights Reserved
                    </div>
                </div>

            </div>
        )
    }


}
