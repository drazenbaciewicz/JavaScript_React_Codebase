// Class that supports the primary employee
import React from 'react';

// Imports for react components
import { Input } from "react";

import "../../../css/Dashboard/EmployeeChatBox.css"

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const months = ["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"];

export default class EmployeeChatBox extends React.Component {

    constructor(props) {
        super(props);

        // Binding
        this.sendMessageEnter = this.sendMessageEnter.bind(this);

        // Setting our text state
        this.state = {
            display_text: []
        }
    }

    // Handling pressing the enter button
    sendMessageEnter(e) {
        let ref = this;
        if (e.key === 'Enter') {

            // Checking if its ALSO shift enter
            if(e.shiftKey) {
                // Shift enter handling
                return;
            }

            // Getting the value of the data
            let message = e.target.value;

            // If the length of the message is 0 or less, don't send anything of course
            if (message.length <= 0) {
                return;
            }

            // Otherwise, lets send the message...
            ref.props.sendText(message);
            
            // Clearing the input fields
            e.target.value = "";
        }
    }

    // Scrolling to bottom
    componentDidUpdate() {
        if (this.finalMessage != undefined) {
            if (this.finalMessage.getDom() != undefined) {
                this.finalMessage.getDom().scrollIntoView({behavior: 'auto'});
            }
        }
    }


    render() {

        //console.log("RENDERING CHAT EMPLOYEE BOX");
        //console.log(this.props.message_list);

        // If the active channel isn't set, simply returning nothing
        if (this.props.active_channel == null || this.props.active_channel == undefined) {
            return null;
        }

        // Building the employee chat right here...
        let chat_list = [];

        // Lets make sure we aren't still loading the chat
        if (this.props.message_list == null || this.props.message_list.length < 1) {
            // LOADING STILL
            //console.log("Still loading... displaying loading screen for chat!");
            chat_list.push(<ChatLoading key = {1} />);
        }
        else {

            console.log("Building chat list from " + this.props.message_list);
            for (let entry = this.props.message_list.length - 1; entry >= 0; entry--) {
                //console.log("GETTING MESSAGES");
                //console.log(entry);

                let message = this.props.message_list[entry];
                console.log(message);

                // If its the last one we are going to set the reference to it...
                let new_message_div = null;
                if (entry == 0) {
                    new_message_div = 
                    <ChatMessage 
                        key = {entry}
                        date = {message['message_sent_time']}
                        message = {message['message_content']}
                        employee = {message['employee_name']}
                        employee_id = {message['employee_id']}
                        current_employee_id = {this.props.credentials['employee_id']}
                        ref={(el) => { this.finalMessage = el; }}
                    />
                }
                else {
                    new_message_div = 
                    <ChatMessage 
                        key = {entry}
                        date = {message['message_sent_time']}
                        message = {message['message_content']}
                        employee = {message['employee_name']}
                        employee_id = {message['employee_id']}
                        current_employee_id = {this.props.credentials['employee_id']}
                    />
                }

                chat_list.push(new_message_div);
            }
        }

        // Otherwise returning
        return (
            <div className = "chat_box_holder">
                <div className = "chat_box_title">
                    {this.props.active_channel['channel']['channel_title']}
                </div>

                <div className = "chat_holder" ref={(el) => { this.messageEnd = el; }}>
                    {chat_list}
                </div>

                <div className = "chat_box_entry">
                    <textarea maxlength="1000" onKeyUp = {this.sendMessageEnter} className = "chat_input">
                    </textarea >
                </div>
            </div>
        )
    }

}

class ChatMessage extends React.Component {

    constructor(props) {
        super(props);
    }

    // Function for getting the primary DOM because I guess we need that?
    getDom() {
        return this.divComponent;
    }

    render() {

        // Converting the given message into a display message
        let date_string = this.props.date + " UTC";
        let dateTime = new Date(date_string);
        console.log(dateTime);
   

        let current_day = days[dateTime.getDay()];
        let current_month = months[dateTime.getMonth()];

        let minute = dateTime.getMinutes();
        if (minute <= 0) {
            minute = "00";
        }
        else if (minute < 10) {
            minute = "0" + minute;
        }
        let hours = dateTime.getHours();
        let flag = "AM";
        if (hours == 0) {
            hours = 12;
        }
        if (hours > 12) {
            hours = hours - 12;
            flag = "PM";
        }

        let current_time = hours+":"+minute+" "+flag;
        let day_of_month = dateTime.getDate();

        let style = "message_holder";
        let body = "message_body";
        if (this.props.employee_id == this.props.current_employee_id) {
            // Setting the ownership style
            style = "message_holder_employee";
            body = "message_body_employee"

        }

        // Determining box text height from word length
        let minHeightValue = 25 * (this.props.message.length / 30) + 60;

        return (
            <div style = {{minHeight: minHeightValue}} className = {style} ref = {(el) => {this.divComponent = el}}>
                <div className = {body}>
                    {this.props.message}

                    <div className = "message_author">
                        {this.props.employee}
                    </div>

                    <div className = "message_timestamp">
                    {current_time} on {current_day}, {current_month} {day_of_month}
                    </div>
                </div>              
            </div>
        )
    }
}

class ChatLoading extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className = "no_chat_messages">No messages to display</div>
        )
    }
}