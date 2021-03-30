import React from 'react';
import TextField from '@material-ui/core/TextField';
import logo_2fa from '../../assets/img/img_2fa.png';
import Button from '@material-ui/core/Button';
import logo_image from '../../assets/img/logo.png';

export default class PasswordReset extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      resetPasswordQuery: null,
      resetPasswordKey: null,
      input_2fa: ['', '', '', '', '', ''],
      input_2fa_element: null,
      last4OfPhone: null,
      validCode: false,
      new_password: null,
      confirm_password: null,
      canUpdatePassword: false
    };

    this.toggleLoadingScreen = this.toggleLoadingScreen.bind(this);
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
        autoFocus={ i === 0 }
        inputProps={ {
          style: { fontSize: 55, textAlign: 'center' },
          maxLength: 1
        } }
        value={ '' }
        key={ i }
        onChange={ (e) => {
          ref.set2fainput(i, e.target.value)
        } }
      />);

      built_2fa[i] = new_textfield;
    }

    this.setState({ input_2fa_element: built_2fa });
  }

  toggleLoadingScreen = async () => {
    this.props.loadingScreen()
  };

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
        autoFocus={ i === (index + 1) }
        inputProps={ {
          style: { fontSize: 55, textAlign: 'center' },
          maxLength: 1
        } }
        value={ current_2fa[i] }
        key={ i }
        onChange={ (e) => {
          ref.set2fainput(i, e.target.value)
        } }
      />

      built_2fa[i] = new_textfield;
    }

    this.setState({ input_2fa: current_2fa, input_2fa_element: built_2fa });
  }

  setPasswordResetQuery = async (value) => {
    this.setState({ resetPasswordQuery: value })
  };

  requestPasswordReset = async () => {
    const { resetPasswordQuery } = this.state;

    this.toggleLoadingScreen();

    const response = await fetch(`${window.REACT_APP_API_URL}/auth/password-reset`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ query: resetPasswordQuery })
    });

    const json_response = await response.json();
    if (response.ok) {
      if (json_response.success) {
        this.setState({ resetPasswordKey: json_response.reset_key, last4OfPhone: json_response.phone_last_4 })
      } else {
        this.setState({})
      }
      this.toggleLoadingScreen();
    }
  };

  validatePasswordReset = async () => {
    const { resetPasswordKey, input_2fa } = this.state;

    this.toggleLoadingScreen();

    const response = await fetch(`${window.REACT_APP_API_URL}/auth/password-reset/${ resetPasswordKey }`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ code: input_2fa.join('') })
    });

    const json_response = await response.json();
    if (response.ok && json_response.success) {
      this.setState({ validCode: true })
    } else {
      // TODO: set error message
      this.setState({})
    }
    this.toggleLoadingScreen();
  };

  setPassword = async (new_password) => {
    this.setState({new_password})
  };

  setConfirmPassword = async (confirm_password) => {
    this.setState({confirm_password})
    if (confirm_password.length > 0) {
      this.setState({ confirm_password, canUpdatePassword: true })
    }
  };

  updatePassword = async () => {
    const { new_password, confirm_password, resetPasswordKey } = this.state;
    if (new_password.length > 0 && confirm_password.length > 0 && new_password === confirm_password) {
      const response = await fetch(`${window.REACT_APP_API_URL}/auth/password-reset/${ resetPasswordKey }`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ password: new_password })
      });

      const json_response = await response.json();
      if (response.ok && json_response.success) {
        return this.resetPasswordComplete();
      }
    }
  };

  resetPasswordComplete = async () => {
    this.props.onComplete();
  };

  render() {
    const { resetPasswordQuery, resetPasswordKey, validCode } = this.state;

    if (this.props.disabled) {
      return null;
    } else {
      if (!resetPasswordKey) {
        return (
          <div className="login_main_text">
            <img src={ logo_2fa } alt="logo" className="logo_2fa" />

            <div>Enter your username for password reset</div>
            <TextField
              id="standard"
              label=""
              className="input_username"
              type="text"
              autoComplete="current-username"
              autoFocus
              margin="normal"
              required
              variant="outlined"
              value={ resetPasswordQuery }
              onChange={ (e) => {
                return this.setPasswordResetQuery(e.target.value)
              } }
            />

            <Button
              onClick={ () => {
                this.requestPasswordReset()
              } }
              variant="contained"
              color="primary"
              className="log_in_button"
              disabled={ false }

            >
              Submit
            </Button>
          </div>
        )
      } else if (!validCode) {
        const { input_2fa, last4OfPhone } = this.state;

        let input_disabled = false;
        for (let i = 0; i < 6; i++) {
          if (input_2fa[i].length <= 0) {
            input_disabled = true;
          }
        }

        return (
          <div className="login_main_text">
            <img src={ logo_2fa } alt="logo" className="logo_2fa" />

            <div className="digitCodeHeader">
              Enter the 6 digit code that has been sent to
            </div>

            <div className="phoneNumber2fa">
              (***) ***-{ last4OfPhone }
            </div>

            <div className="text_field2fa_holder">
              { this.state.input_2fa_element }
            </div>

            <Button
              onClick={ () => {
                this.validatePasswordReset()
              } }
              variant="contained"
              color="primary"
              className="log_in_button"
              disabled={ input_disabled }
            >
              Validate
            </Button>
          </div>
        )
      } else {
        const { new_password, confirm_password, canUpdatePassword } = this.state;

        return (
          <div className="login_main_text">
            <img src={ logo_image } alt="logo" className="logo_image" />
            <TextField
              id="standard-password-input"
              label="Password"
              className="input_password"
              type="password"
              autoComplete="current-password"
              margin="normal"
              required
              variant="outlined"
              value={ new_password }
              onChange={ (e) => {
                this.setPassword(e.target.value)
              } }
            />

            <TextField
              id="standard-password-input"
              label="Confirm Password"
              className="input_password"
              type="password"
              autoComplete="current-password"
              margin="normal"
              required
              variant="outlined"
              value={ confirm_password }
              onChange={ (e) => {
                this.setConfirmPassword(e.target.value)
              } }
            />

            <Button
              onClick={ () => {
                this.updatePassword()
              } }
              variant="contained"
              color="primary"
              className="log_in_button"
              disabled={ !canUpdatePassword }
            >
              Update Password
            </Button>
          </div>
        )
      }
    }
  }
}
