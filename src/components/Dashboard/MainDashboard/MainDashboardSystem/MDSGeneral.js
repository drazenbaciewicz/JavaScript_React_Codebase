// Importing base react
import React from 'react';

// Material Ui
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

// Global functions
import {utcToLocal} from "../../../Tools";

// Importing local components
import DropButton from "../../../DropButton";

// Importing the CSS
import "../../../../css/Dashboard/MainDashboardSystem/MDSMain.css";
import "../../../../css/Dashboard/MainDashboardSystem/MDSGeneral.css";
import { Button } from '@material-ui/core';

const options = [
    'Active',
    'Inactive',
    'New',
    'Hot Lead',
    'Hung Up Immediately',
    'No Answer',
    'No Interest',
    'Do Not Call',
    'how to change color'
];

export default class MDSGeneral extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            anchor_status: null,
            dropdown: {
                status: 0
            }
        }

        this.handleMenuStatusClick = this.handleMenuStatusClick.bind(this);
        this.handleMenuStatusClose = this.handleMenuStatusClose.bind(this);
    }

    // Functions for the status dropdown and menu dropdowns in general
    handleMenuStatusClick(event) {
        let new_dropdown = this.state.dropdown;
        new_dropdown['status'] = 1;
        this.setState({anchor_status: event.target, dropdown: new_dropdown});
    }

    handleMenuStatusClose(e) {
        // Updating the user info
        if (e !== null && e !== undefined && e.length > 0) {
            this.props.modifyUserData(e, "lead_status");
        }

        let new_dropdown = this.state.dropdown;
        new_dropdown['status'] = 0;
        this.setState({dropdown: new_dropdown});
    }

    ////////////////////
    // Data Functions //
    ////////////////////

    // Function for getting all of the calls associated with this client...
    getClientCalls() {

    }

    // Function for getting the employee data associated with this client...
    // A little dumb but whatever
    getEmployeeClientInfo() {

    }

    // Function for getting all of the logs and notes for this client
    getClientLog() {

    }

    //////////////////////
    //////////////////////
    //////////////////////

    render() {

        // Grabbing some important date from our state
        let anchor_status = this.state.anchor_status;
        
        return (
            <div className = "primary_mds_holder">
                <div className = "mdsg_upper_holder">
                    <div className = "mdsg_client_info_left">

                        <Paper
                            elevation={10}
                            className = "mdsg_client_paper"
                            color = "primary"
                        >
                            <div className = "mdsg_first_name">{this.props.data['lead_first_name'] + " " + this.props.data['lead_middile_initial']}</div>
                            <div className = "mdsg_last_name">{this.props.data['lead_last_name']}</div>
                            <div className = "mdsg_city">{this.props.data['lead_city']}, {this.props.data['lead_state']}</div>
                            <div className = "mdsg_status_dropdown" onClick = {(e) => {this.handleMenuStatusClick(e)}}>
                                <div className = "mdsg_status_dropdown_text">{this.props.data['lead_status']}</div>
                            </div>

                            <div className = "mdsg_client_orange_button_holder">
                                <div className = "mdsg_client_orange_button" onClick = {() => {this.props.setPopupState(true, "appointment")}}>
                                    <i className = "fa fa-calendar mdsg_orange_icon" />
                                </div>
                                <div className = "mdsg_client_orange_button" onClick = {() => {this.props.setPopupState(true, "call")}}>
                                    <i className = "fa fa-phone mdsg_orange_icon" />
                                </div>
                                <div className = "mdsg_client_orange_button" onClick = {() => {this.props.setPopupState(true, "message")}}>
                                    <i className = "fa fa-comment mdsg_orange_icon" />
                                </div>
                                <div className = "mdsg_client_orange_button" onClick = {() => {this.props.setPopupState(true, "voicecall")}}>
                                    <i className = "fa fa-volume-up mdsg_orange_icon" />
                                </div>
                                <div className = "mdsg_client_orange_button" onClick = {() => {this.props.setPopupState(true, "mail")}}>
                                    <i className = "fa fa-envelope mdsg_orange_icon" />
                                </div>
                            </div>

                            <div className = "mdsg_client_smartcredit_pull_holder">
                                <Button
                                    variant="outlined"
                                    className = "mdsg_client_smartcredit_button"
                                >
                                    Login to SC
                                </Button>
                            </div>
                        </Paper>
                    
                    </div>

                    <div className = "mdsg_client_data_right">
                        <Paper
                            elevation={10}
                            className = "mdsg_general_paper"
                        >
                            <div className = "mdsg_client_data_row">

                            </div>
                            <div className = "mdsg_client_data_row">
                                <TextField className = "text_field_client_data_row" label = "Cleint ID" value = {this.props.data['lead_id']} disabled={true}/>
                                <TextField className = "text_field_client_data_row" label = "FICO" disabled={true}/>
                                <TextField className = "text_field_client_data_row" label = "Total Calls" disabled={true}/>
                            </div>
                            <div className = "mdsg_client_data_row">
                                <TextField className = "text_field_client_data_row" label = "Assigned To" value = {this.props.data['employee_id']} disabled={true}/>
                                <TextField className = "text_field_client_data_row" label = "Application Date" value = {utcToLocal(this.props.data['submission_date'])} disabled={true}/>
                                <TextField className = "text_field_client_data_row" label = "Last Call" disabled={true}/>
                            </div>
                            <div className = "mdsg_client_data_row">
                                <TextField className = "text_field_client_data_row" label = "Contact Number" disabled={true}/>
                                <TextField className = "text_field_client_data_row" label = "Created Date" value = {utcToLocal(this.props.data['lead_create_date'])} disabled={true}/>
                                <TextField className = "text_field_client_data_row" label = "Campaign Name" disabled={true}/>
                            </div>
                        </Paper>
                    </div>
                </div>

                <Menu
                    id="long-menu"
                    anchorEl={anchor_status}
                    open={this.state.dropdown['status']}
                    onClose={this.handleMenuStatusClose}
                    PaperProps={{
                        style: {
                        maxHeight: 375,
                        width: 250,
                        },
                    }}
                    >
                    {options.map(option => (
                        <MenuItem key={option} selected={option === 'Pyxis'} onClick={() => {this.handleMenuStatusClose(option)}}>
                            {option}
                        </MenuItem>
                    ))}
                </Menu>

                <DropButton
                    title = {"All Notes"}
                />
            </div>
        )
    }
}