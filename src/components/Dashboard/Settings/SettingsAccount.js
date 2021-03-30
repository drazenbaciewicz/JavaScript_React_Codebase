// This is a template for creating new reactJS files

// Importing React
import React from 'react';

// Importing base CSS
import "../../../css/Dashboard/Dashboard.css"
import "../../../css/Dashboard/Settings.css"

// Loading the normal Material UI
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { InputLabel } from '@material-ui/core';

export default class SettingsAccount extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user_info: null,
            group_list: null
        }
    }

    // Getting the available groups when we load our system
    getPermissionGroups() {
        // Loading permission groups
        let ref = this;

        // Creating the data
        let data = {
            "employee_auth": this.props.credentials['employee_auth'],
            "employee_id": this.props.credentials['employee_id']
        };

        // Getting messages
        console.log("Getting permission groups...");

        fetch('http://159.65.71.123:5000/employee/group/get', {
            method: 'post',
            body: JSON.stringify(data)
        })
            .then(function(response) {
            return response.json();
        })
        .then(function(myJson) {
            console.log("GROUP RESULTS");
            console.log(myJson);

            ref.setState({group_list: myJson['output']})

        });
    }

    componentDidMount() {
        this.getPermissionGroups();
        this.setState({user_info: this.props.user_info});
    }

    // Function for handling the group select change
    handleGroupSelectChange(value) {
        let new_user_info = this.state.user_info;
        new_user_info['employee_permission_group_id'] = value.target.value;
        this.setState({user_info: new_user_info});
    }

    updateEntry(entry_title, event) {
        let new_user_info = this.state.user_info;
        new_user_info[entry_title] = event.target.value;
        this.setState({user_info: new_user_info});
    }

    // Function that checks to see if all of the userinfo thats required to save has been filled in...
    canSave() {
        if (
                this.state.user_info !== null && 
                this.state.user_info !== undefined &&
                this.state.user_info['employee_title'] !== null && this.state.user_info['employee_title'] !== undefined && this.state.user_info['employee_title'].length > 0 &&
                this.state.user_info['employee_name'] !== null && this.state.user_info['employee_name'] !== undefined && this.state.user_info['employee_name'].length > 0 &&
                this.state.user_info['employee_phone_number'] !== null && this.state.user_info['employee_phone_number'] !== undefined && this.state.user_info['employee_phone_number'].length > 0 &&
                this.state.user_info['employee_email'] !== null && this.state.user_info['employee_email'] !== undefined && this.state.user_info['employee_email'].length > 0 &&
                this.state.user_info['employee_permission_group_id'] !== null && this.state.user_info['employee_permission_group_id'] !== undefined
            ) {
                return true;
            }

        return false;
    }

    render() {
        
        console.log(this.props.user_info);

        if (this.props.user_info === null || this.props.user_info === undefined || this.state.user_info === null || this.state.user_info === undefined) {
            return (
                <div />
            )
        }

        let save_button = null;
        if (this.props.edit_mode) {
            save_button = 

            <Button
                variant="contained"
                color="primary"
                className = "settings_account_save_button"
                onClick = {() => {this.props.onSave(this.state.user_info)}}
                disabled={!this.canSave()}
            >
                Save
            </Button>
        }

        // Building the group permission list
        let group_permission_list = [];

        // Building it from the known list of components that we have
        if (this.state.group_list !== null && this.state.group_list !== undefined)
            for (let entry in this.state.group_list) {
                let tempMenuItem = <MenuItem value={this.state.group_list[entry]['group_id']}>{this.state.group_list[entry]['group_name']}</MenuItem>
                group_permission_list.push(tempMenuItem);
            }

        return (
            <div className = "settings_container">
                <div className = "account_container">

                    <div className = "account_container_left">
                        <div className = "account_profile_picture">
                            <img className = "account_profile_picture_img" src = {require("../../../assets/img/profile_circle.png")} />
                        </div>

                        <div className = "account_title_header">
                            Title
                        </div>
                        <div className = "account_title">
                            <TextField onChange = {(e) => {this.updateEntry("employee_title", e)}} disabled={!this.props.edit_mode} value = {this.state.user_info['employee_title']} className = "account_container_input"/>
                        </div>

                        {save_button}
                    
                    </div>

                    <div className = "account_container_middle">

                        <div className = "account_top_spacer" />

                        <div className = "account_container_input">
                            <div className = "account_container_input_header">
                                Employee Name
                            </div>
                            <TextField onChange = {(e) => {this.updateEntry("employee_name", e)}} disabled={!this.props.edit_mode} value = {this.state.user_info['employee_name']} className = "account_container_input" inputProps = {{fontSize: "50px"}}/>
                        </div>

                        <div className = "account_middle_spacer" />

                        <div className = "account_container_input">
                            <div className = "account_container_input_header">
                                Account Username
                            </div>
                            <TextField onChange = {(e) => {this.updateEntry("emeployee_username", e)}} disabled={!this.props.edit_mode} value = {this.state.user_info['employee_username']} className = "account_container_input" inputProps = {{fontSize: "50px"}}/>
                        </div>

                        <div className = "account_middle_spacer" />

                        <div className = "account_container_input">
                            <div className = "account_container_input_header">
                                Personal Phone Number
                            </div>
                            <TextField onChange = {(e) => {this.updateEntry("employee_phone_number", e)}} disabled={!this.props.edit_mode} value = {this.state.user_info['employee_phone_number']} className = "account_container_input" inputProps = {{fontSize: "50px"}}/>
                        </div>

                        <div className = "account_middle_spacer" />

                        <div className = "account_container_input">
                            <div className = "account_container_input_header">
                                Personal Email
                            </div>
                            <TextField onChange = {(e) => {this.updateEntry("employee_email", e)}} disabled={!this.props.edit_mode} value = {this.state.user_info['employee_email']} className = "account_container_input" inputProps = {{fontSize: "50px"}}/>
                        </div>
                    
                    </div>
                    <div className = "account_container_right">

                        <div className = "account_top_spacer" />

                        <FormControl component="fieldset" className = "account_language_form_control">
                            <FormLabel component="legend" className = "radio_title">Preferred Language</FormLabel>
                            <RadioGroup
                                aria-label="Language"
                                name="language"
                                className="account_language_radio_group"
                                value={"english"}
                                onChange={(value) => {this.selectLanguageBox(value)}}
                            >
                                <FormControlLabel className = "radio_box_english" value="english" control={<Radio color="#2FBAFF"/>} label="English" variant="filled"/>
                                <FormControlLabel className = "radio_box_spanish" value="spanish" control={<Radio />} label="Spanish" />
                            </RadioGroup>
                        </FormControl>

                        <div className = "account_middle_spacer" />
                        
                        <div className = "account_container_input" style = {{width: "100%", marginLeft: 0}}>
                            <div className = "account_container_input_header">
                                VoIP Routing Number
                            </div>
                            <TextField onChange = {(e) => {this.updateEntry("employee_phone_route", e)}} disabled={!this.props.edit_mode} value = {this.state.user_info['employee_phone_route']} className = "account_container_input" inputProps = {{fontSize: "50px"}} color="primary"/>
                        </div>

                        <div className = "account_permission_group_dropdown">
                            <InputLabel>Permission Group</InputLabel>
                            <Select
                                value={this.state.user_info['employee_permission_group_id']}
                                onChange={(v) => {this.handleGroupSelectChange(v)}}
                                displayEmpty
                                name="age"
                                className="account_permission_group_select"
                                disabled={!this.props.edit_mode}
                            >
                                {group_permission_list}
                            </Select>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}