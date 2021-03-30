// Importing the Popups
import Popup from 'reactjs-popup';

// Importing base CSS
import "../../../css/Dashboard/NotifyPopup.css"

// Importing React
import React from 'react';

export default class MessagePopup extends React.Component {
    
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className = "chat_popup_holder">

                <div className = "chat_popup_body">
                    <div className = "popup_title">New Chat Messages</div>
                </div>
            </div>
        )
    }
}