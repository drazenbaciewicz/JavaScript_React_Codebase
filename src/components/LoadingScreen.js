import React from 'react';
import logo_image from '../assets/img/logo.png';
import CircularProgress from '@material-ui/core/CircularProgress';

export default class LoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      disabled: props.disabled
    }
  }

  render() {
    const { disabled } = this.state;

    if (disabled) {
      return null;
    } else {
      return (
        <div className="login_main_text">
          <img src={ logo_image } alt="logo" className="logo_image" />

          <div className="loginProgressHolder">
            <CircularProgress className="loginProgress" size={ 80 } thickness={ 5 } />
          </div>
        </div>
      )
    }
  }
}
