// Importing React
import React from 'react';

// Importing base CSS
import "../../../css/Dashboard/EmployeeChatPopup.css"

// Loading the normal Material UI
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import AlarmOn from '@material-ui/icons/AlarmOn';
import CircularProgress from '@material-ui/core/CircularProgress';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

// Importing our list
import List from "../List";


export default class EmployeeChatEditPopup extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = {
            chat_title: "",
            chat_type: "direct",

            add_member_list: {},
            add_member_display_list: [],
            checked_member_list: [],

            checked: []
        }

        // Binding the state
        this.setChatType = this.setChatType.bind(this);
        this.handleListCheck = this.handleListCheck.bind(this);
    }

    // Controlling the mount procedure to load editable data
    

    // Setting the username
    setChatTitle(new_chat_title) {
        console.log("Updating chat tile");
        console.log(new_chat_title);
        this.setState({chat_title: new_chat_title});
    }

    // Setting the chat type
    setChatType(type) {
        this.setState({chat_type: type});
    }

    // When component mounts, get all employees
    componentDidMount() {
        console.log("MOUNTING THE EDIT CHANNEL COMPONET!");
        console.log(this.props.active_channel);

        let channel_title = this.props.active_channel['channel']['channel_title'];

        this.setState({chat_title: channel_title});
        this.getEmployeeList();
    }

    // Getting employee list from which to add employees to
    getEmployeeList() {
        let ref = this;

        // Creating the data
        let data = {
            "employee_auth": this.props.credentials['employee_auth'],
            "employee_id": this.props.credentials['employee_id']
        };
        data['target_employee_id'] = "All";

        // Getting messages
        console.log("Getting employees!");

        fetch('http://159.65.71.123:5000/employee/get', {
            method: 'post',
            body: JSON.stringify(data)
        })
            .then(function(response) {
            return response.json();
        })
        .then(function(myJson) {
            console.log("RECIEVED RESPONSE! SETTING MESSAGE DISPLAY");
            console.log(myJson);

            let new_checked = [];
            

            // Also processing the display list
            let new_add_member_display_list = [];
            let new_add_member_list = {};
            
            // Iterating and building a hashtable for easy creation
            for (let entry in myJson['output']) {
                let entry_value = myJson['output'][entry];
                let employee_name = entry_value['employee_name']

                new_add_member_list[employee_name] = entry_value['employee_id'];
                new_add_member_display_list.push([employee_name, entry_value['employee_title']]);

                // Is this individual already in our checked members list? Important to know...
                let employee_id = entry_value['employee_id'];
                let member_list = ref.props.active_channel['members'];

                for (let member_entry in member_list) {
                    let member_entry_value = member_list[member_entry];
                    let member_employee_id = member_entry_value['employee_id'];


                    // Checking if its the correct index
                    if (member_employee_id == employee_id) {
                        console.log("MATCHED CHECKED VALUE, INDICATING CHECKED ENTRY SET")
                        new_checked[entry] = true;
                    }
                }
            }

            ref.setState({checked: new_checked, add_member_list: new_add_member_list, add_member_display_list: new_add_member_display_list});
        });
    }

    // Rendering
    render() {

        // Building the form controls

        // Building radios
        let group_radio = 
        <Radio
            checked={this.state.chat_type === 'group'}
            onChange={(e,v) => {this.setChatType(e.target.value)}}
            value="group"
            name="radio-button-demo"
            aria-label="Group Chat"
        />;

        let direct_radio = 
        <Radio
            checked={this.state.chat_type === 'direct'}
            onChange={ (e,v) => {this.setChatType(e.target.value)}}
            value="direct"
            name="radio-button-demo"
            aria-label="Direct Chat"
        />;

        // Building labels
        let group_label = 
        <FormControlLabel
            value="group"
            control={group_radio}
            label="Group Chat"
            labelPlacement="left"
        />;

        let direct_label = 
            <FormControlLabel
            value="direct"
            control={direct_radio}
            label="Direct Chat"
            labelPlacement="left"
        />;

        // Determining what type to render
        // Rendering group

        // Do we render the list?
        let display_member_list = null;
        if (this.state.add_member_display_list.length > 0) {
            // Render it!
            display_member_list =
            <List
                header = {["Employee Name", "Employee Title"]}
                width={[300, 300]}
                data = {this.state.add_member_display_list}
                listHeaderClassName = "chat_list_header"
                listDisplayHolderClassName = "chat_list_holder"
                handleCheckAll = {this.handleCheckAll}
                handleCheck={this.handleListCheck}
                checked_data={this.state.checked}

                listDisplayType={"list"}
            />

        }

        let input_render = 
        <div className = "chat_input_group">
            <div className = "chat_input_header" color = "primary"> 
                Chat Title
            </div>

            <TextField
                id="standard"
                className="input_chat"
                type="text"
                autoComplete="current-username"
                margin="normal"
                required
                variant="filled"
                value = {this.state.chat_title}
                onChange = {(e,v) => {this.setChatTitle(e.target.value)}}
            />

            <div className = "employee_add_holder">

            </div>

            <div className = "employee_list_holder">
                {display_member_list}
            </div>

        </div>

        // Display radio buttons by rendering the form components above ^^^


        return (
            <div className = "chat_popup_holder">

                <div className = "chat_popup_body">

                    <div className = "chat_radio_holder">

                    </div>

                    {input_render}

                    <Button variant="contained" color="primary" className = "create_channel_button" onClick={() => {this.editChatChannel()}}>
                        Save Changes
                    </Button>
                    
                </div>
            </div>
        )
    }

    // Function for creating the chat channel
    editChatChannel() {
        console.log("Editing new channel then forcing a direct refresh");

        let ref = this;

        console.log(this.state);

        // Creating the data
        let data = {
            "employee_auth": this.props.credentials['employee_auth'],
            "employee_id": this.props.credentials['employee_id']
        };
        data['channel_title'] = this.state.chat_title;

        // Building employee list
        let employee_id_list = []
        for (let entry in this.state.checked) {

            if (!this.state.checked[entry]) {
                continue;
            }
            let entry_value = this.state.add_member_display_list[entry][0];
            let employee_id = this.state.add_member_list[entry_value];

            employee_id_list.push(employee_id);
        }
        data['members'] = employee_id_list;
        data['channel_id'] = this.props.active_channel['channel_id'];

        // Getting messages
        console.log("Creating channel!");
        console.log(data);

        fetch('http://159.65.71.123:5000/chat/channel/edit_full', {
            method: 'post',
            body: JSON.stringify(data)
        })
            .then(function(response) {
            return response.json();
        })
        .then(function(myJson) {
            console.log("Attempted to edit channel");
            console.log(myJson);
            
            if (myJson['code'] == 200) {
                alert("Success!");
                ref.props.setPopupState(false);
                setTimeout(function() {
                    ref.props.fetchEmployeeChats();
                }, 500);
            }
        });

    }

    // Function for clicking everything
    handleCheckAll() {
        // Do nothing basically...
    }

    // Function for handling when you check a button
    handleListCheck(index) {
        // Managing the checked indexes
        console.log("PRESSING THE CHECK BUTTON :O")
        console.log(index)

        let checked_new = this.state.checked;
        
        // If this index ALREADY exists, lets swap the value stored
        if (index in checked_new) {
            checked_new[index] = !checked_new[index];
        }

        // Otherwise create it to true
        else {
            checked_new[index] = true;
        }

        this.setState({checked: checked_new});
        console.log(checked_new)
    }
}