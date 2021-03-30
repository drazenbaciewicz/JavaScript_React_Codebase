// Importing base react
import React from "react";

// Importing animation library
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'; // ES6

// Importing CSS
import "../../css/Login/LoadingScreen.css"

// ReactJS Material UI Components
import CircularProgress from '@material-ui/core/CircularProgress';

// Barebones loading screen
export default class LoadingScreen extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        let loading_screen = 
        <div className = "loading_screen">

            <div className = "loading_text">Loading...</div>
            <CircularProgress className = "loginProgress" size = {80} thickness = {5}/>
        </div>

        return (
            <div className = "loading_screen_holder">
                <ReactCSSTransitionGroup
                    transitionName="example"
                    transitionAppear={true}
                    transitionAppearTimeout={1500}
                    transitionEnter={true}
                    transitionLeave={true}>
                    {loading_screen}
                </ReactCSSTransitionGroup>
            </div>
        )
    }
}