// This is a template for creating new reactJS files

// Importing React
import React from 'react';

// Importing the Popups
import Popup from 'reactjs-popup';

// Importing components
import EmployeeChatBox from "./EmployeeChatBox";

// Importing base CSS
import "../../../css/Dashboard/Dashboard.css"
import "../../../css/Dashboard/EmployeeChat.css"
import EmployeeChatAddPopup from './EmployeeChatAddPopup';
import EmployeeChatEditPopup from './EmployeeChatEditPopup';
import EmployeeChatMemberBox from "./EmployeeChatMemberBox";

class ChannelEntryElement extends React.Component {

    constructor(props) {
        super(props);
    }

    // Function for loading the edit popup
    loadEditPopup() {
        console.log("LOADING EDIT POPUP");
        this.props.displayEditPopup(true, this.props.channel);
    }

    archiveChannel() {
        console.log("Archiving chat");
    }

    render() {

        // Only display edit if we can edit this channel
        let edit_icon = null;
        let archive_icon = null;

        // Determining whether or not this is the active channel to be displayed
        let active = "";
        let active_icon;
        if (this.props.active_channel == this.props.channel_id) {
            active = " active_channel";
            active_icon = " active_icon"
        }

        let channel_creator_id = Number(this.props.channel['channel']['channel_creator']);
        let employee_id = Number(this.props.employee_id);

        console.log(channel_creator_id+","+employee_id);

        if (employee_id === channel_creator_id) {
            edit_icon = <i onClick = {() => {this.loadEditPopup()}} className={"fa fa-edit channel_entry_icon " + active_icon}></i>;
            archive_icon = <i onClick = {() => {this.archiveChannel()}} className={"fa fa-trash-alt channel_delete_icon " + active_icon}></i>;
        }

        console.log(edit_icon);

        return (
            <div className = {"channel_entry_element" + active} onClick = {() => {this.props.setActiveChannel(this.props.channel_id, this.props.channel)}}>
                {this.props.channel_title}
                {edit_icon}
                {archive_icon}
            </div>

        )
    }
}

export default class EmployeeChat extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            channel_group: {},
            channel_direct: {},

            active_channel_id: -1,
            active_channel: null,
            display_popup: false,
            edit_channel: null,
            display_edit_popup: false,

            message_list: null,
            member_list: null
        };

        // Function binding
        this.setActiveChannel = this.setActiveChannel.bind(this);
        this.getMessages = this.getMessages.bind(this);
        this.sendText = this.sendText.bind(this);
        this.setPopupState = this.setPopupState.bind(this);
        this.displayEditPopup = this.displayEditPopup.bind(this);
        this.setEditPopupState = this.setEditPopupState.bind(this);
        this.fetchEmployeeChats = this.fetchEmployeeChats.bind(this);
    }

    
    displayEditPopup(value, data) {
        console.log("LOADING EDIT POPUP #2");
        this.setState({edit_channel: data, display_edit_popup: value});
    }

    // Function for setting the active channel
    setActiveChannel(channel_id, channel) {
        console.log("Setting active channel to " + channel_id + ", " + channel);
        this.setState({active_channel_id: channel_id, active_channel: channel});
        this.getChannelMembers(channel_id);

        // Getting messages
        this.getMessages(channel_id);
    }

    // Repeatedly checking for new messages...
    getMessages(channel_id) {

        let ref = this;

        // Creating the data
        let data = {
            "employee_auth": this.props.credentials['employee_auth'],
            "employee_id": this.props.credentials['employee_id']
        };
        data['channel_id'] = channel_id;

        // Getting messages
        console.log("Getting messages!");

        fetch('http://159.65.71.123:5000/chat/get', {
            method: 'post',
            body: JSON.stringify(data)
        })
            .then(function(response) {
            return response.json();
        })
        .then(function(myJson) {
            console.log("RECIEVED RESPONSE! SETTING MESSAGE DISPLAY");
            console.log(myJson);
            ref.setState({message_list: myJson['output']});
        });
    }

    // Function for getting all of the employee's for a channel
    getChannelMembers(channel_id) {
        let ref = this;

        // Creating the data
        let data = {
            "employee_auth": this.props.credentials['employee_auth'],
            "employee_id": this.props.credentials['employee_id']
        };
        data['channel_id'] = channel_id;

        fetch('http://159.65.71.123:5000/chat/channel/get/members', {
            method: 'post',
            body: JSON.stringify(data)
        })
            .then(function(response) {
            return response.json();
        })
        .then(function(myJson) {
            console.log("RECIEVED RESPONSE! SETTING MESSAGE DISPLAY");
            console.log(myJson);
            ref.setState({member_list: myJson['output']});
        });
    }

    // Function for fetching employees
    fetchEmployeeChats() {

        let ref = this;
        console.log(this.props.credentials);

        fetch('http://159.65.71.123:5000/chat/channel/get', {
            method: 'post',
            body: JSON.stringify(this.props.credentials)
        })
            .then(function(response) {
            return response.json();
        })
        .then(function(myJson) {
            // Determining which channels are groups and which aren't
            let new_channel_group = [];
            let new_channel_direct = [];

            console.log("RECIEVED RESPONSE");
            console.log(myJson);

            let output = myJson['output']

            for (let entry_id in output) {
                console.log("Processing on " + entry_id);
                let entry = output[entry_id];

                if (entry['members'] == null) {
                    continue;
                }

                let length = entry['members'].length;

                // If the length is > 2, its a group discussion
                if (length > 2) {
                    new_channel_group.push(entry);
                }

                // Otherwise pushing it into direct
                else {
                    new_channel_direct.push(entry);
                }
            }

            console.log(new_channel_group);
            console.log(new_channel_direct);

            // Updating state
            ref.setState({
                channel_group: new_channel_group,
                channel_direct: new_channel_direct
            })

        });
    }

    // Function for sending the message
    sendText(message) {

        let ref = this;

        // Creating the message
        let data = {
            "employee_auth": this.props.credentials['employee_auth'],
            "employee_id": this.props.credentials['employee_id'],
            "employee_name": this.props.credentials['employee_name']
        }
        data['message'] = message;
        data['channel_id'] = this.state.active_channel_id;

        console.log("SENDING MESSAGE WITH DATA OF ");
        console.log(data);

        fetch('http://159.65.71.123:5000/chat/send', {
            method: 'post',
            body: JSON.stringify(data)
        })
            .then(function(response) {
            return response.json();
        })
        .then(function(myJson) {
            console.log(myJson);

            // Loading the texts
            ref.getMessages(ref.state.active_channel_id);
        });
    }

    // Handling the popups
    setPopupState(state) {
        console.log("Setting popup state to " + state);
        this.setState({display_popup: state});
    }

    setEditPopupState(state) {
        console.log("Setting edit state to " + state);
        this.setState({display_edit_popup: state});
    }
    

    // In here is where we will get all of the chat channels
    componentWillMount() {

        // Fetching all employee chats
        this.fetchEmployeeChats();
    }

    render() {

        // Building channel display
        let div_channel_group = [];
        let div_channel_direct = [];

        for (let channel_id in this.state.channel_group) {
            let group_entry = this.state.channel_group[channel_id];

            let entry_div = <ChannelEntryElement 
                active_channel = {this.state.active_channel_id} 
                key = {channel_id} 
                message_count = {group_entry['channel']['channel_message_count']}
                channel_id = {group_entry['channel']['channel_id']}
                channel_title = {group_entry['channel']['channel_title']}
                setActiveChannel = {this.setActiveChannel}
                channel = {group_entry}
                displayEditPopup = {this.displayEditPopup}
                employee_id = {this.props.credentials['employee_id']}>
            </ChannelEntryElement>;
            
            div_channel_group.push(entry_div);

        }
        for (let channel_id in this.state.channel_direct) {
            let group_entry = this.state.channel_direct[channel_id];

            let entry_div = <ChannelEntryElement 
                active_channel = {this.state.active_channel_id} 
                key = {channel_id} 
                message_count = {group_entry['channel']['channel_message_count']}
                channel_id = {group_entry['channel']['channel_id']}
                channel_title = {group_entry['channel']['channel_title']}
                setActiveChannel = {this.setActiveChannel}
                displayEditPopup = {this.displayEditPopup}
                employee_id = {this.props.credentials['employee_id']}
                channel = {group_entry}>
            </ChannelEntryElement>;

            div_channel_direct.push(entry_div);
        }

        let display_edit_popup = this.state.display_edit_popup;
        console.log(display_edit_popup);
        


        return (
            <div className = "primary_container">
                <div className = "dashboard_title_holder">
                    Employee Chat
                </div>

                <div className = "employee_chat_selector">

                    <div className = "employee_group_channel_header">
                        <div className = "employee_chat_channel_title">
                            Group Discussions <i className="fa fa-plus-circle add_group_icon" onClick = {() => {this.setPopupState(true)}}></i>
                        </div>
                    </div>

                    <div className = "employee_group_channels">
                        {div_channel_group}
                    </div>

                    <div className = "employee_group_channel_header">
                        <div className = "employee_chat_channel_title">
                            Direct Message <i className="fa fa-plus-circle add_group_icon" onClick = {() => {this.setPopupState(true)}}></i>
                        </div>
                    </div>

                    <div className = "employee_group_channels">
                        {div_channel_direct}
                    </div>
                </div>

                <EmployeeChatBox 
                    message_list = {this.state.message_list} 
                    active_channel = {this.state.active_channel} 
                    active_channel_id = {this.state.active_channel_id} 
                    credentials = {this.props.credentials}
                    sendText = {this.sendText}
                />

                <EmployeeChatMemberBox
                    member_list = {this.state.member_list}
                />

                <Popup
                    open={this.state.display_popup}
                    onClose={() => {this.setPopupState(false,"")}}
                >
                    <EmployeeChatAddPopup
                        credentials = {this.props.credentials}
                        setPopupState = {this.setPopupState}
                   />
                </Popup>

                <Popup
                    open={display_edit_popup}
                    onClose={() => {this.setEditPopupState(false,"")}}
                >
                    <EmployeeChatEditPopup 
                        active_channel = {this.state.active_channel}
                        credentials = {this.props.credentials}
                        setPopupState = {this.setEditPopupState}
                        edit_channel = {this.state.edit_channel}
                        fetchEmployeeChats = {this.fetchEmployeeChats}
                    />    
                </Popup>
            </div>
        )
    }
}