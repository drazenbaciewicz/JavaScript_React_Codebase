// Importing base react
import React from 'react';

// Material UI
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Menu from '@material-ui/core/Menu';
import Checkbox from '@material-ui/core/Checkbox';
import MenuItem from '@material-ui/core/MenuItem';

// Importing base CSS
import "../../../../css/Dashboard/MDSP/MDSPAppointment.css";

const options_employee = [
    "Alexander Weber",
    "Nika Zaballa",
    "Andrew Adrian"
]

const options_email = ["awalexweber@gmail.com"]
const options_sms = ["+1 (858) 668-6091", "+1 (210) 252-1532", "+1 (214) 251-5252"]

export default class MDSPAppointment extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            popup_employee: false,
            popup_email: false,
            popup_phone: false,
            anchor_status: null,

            // Handling states for the emails and phone numbers...
            email_select: {},
            phone_select: {},

            // Building the other selectors
            flexible: false,
            alert: false,
            appointment_date: "",
            appointment_time: "",
            send_invite_email: false,
            send_invite_phone: false,
            client_phone_number: "",
            client_name: "",
            client_id: "",
            notes: "",
            call_subject: "",
            assigned_opener: "",
            assigned_opener_id: -1,

            assigned_employee: "Opener Assigned"
        }

        this.handleMenuStatusClose = this.handleMenuStatusClose.bind(this);
        this.setPhoneSelect = this.setPhoneSelect.bind(this);
        this.setEmailSelect = this.setEmailSelect.bind(this);
        this.handleMenuStatusClick = this.handleMenuStatusClick.bind(this);
    }

    setEmailSelect(index) {
        let new_email_select = this.state.email_select;
        if (new_email_select[index] !== undefined) {
            new_email_select[index] = !new_email_select[index];
        }
        else {
            new_email_select[index] = true;
        }

        this.setState({email_select: new_email_select});
    }

    setPhoneSelect(index) {
        let new_phone_select = this.state.phone_select;
        if (new_phone_select[index] !== undefined) {
            new_phone_select[index] = !new_phone_select[index];
        }
        else {
            new_phone_select[index] = true;
        }

        this.setState({phone_select: new_phone_select});
    }

    handleMenuStatusClose(e, type) {

        if (e !== null) {

            if (type === "employee")
                this.setState({
                    popup_employee: false, 
                    popup_email: false,
                    popup_phone: false,
                    assigned_employee: e});
            if (type === "email")
                this.setState({
                    popup_employee: false, 
                    popup_email: false,
                    popup_phone: false,
                    assigned_employee: e});
            if (type === "phone")
                this.setState({
                    popup_employee: false, 
                    popup_email: false,
                    popup_phone: false,
                    assigned_employee: e});
            return;
        }
        this.setState({popup_employee: false, 
            popup_email: false,
            popup_phone: false
        });
    }

    handleMenuStatusClick(e, type) {
        if (type === "employee")
            this.setState({popup_employee: true, anchor_status: e.target});
        if (type === "email")
            this.setState({popup_email: true, anchor_status: e.target});
        if (type === "phone")
            this.setState({popup_phone: true, anchor_status: e.target});
    }

    render() {

        let anchor_status = this.state.anchor_status;

        // Display options
        let display_select_email = "Email";
        let display_select_phone = "Phone";
        let display_email_count = 0;
        let display_phone_count = 0;

        for (let key_index in this.state.phone_select) {
            display_select_phone = key_index;

            if (this.state.phone_select[key_index])
                display_phone_count++;
        }

        for (let key_index in this.state.email_select) {
            display_select_email = key_index;

            if (this.state.email_select[key_index])
                display_email_count++;
        }

        if (display_phone_count > 1) {
            display_select_phone = display_select_phone + " and " + display_phone_count + " more"
        }

        if (display_email_count > 1) {
            display_select_email = display_select_email + " and " + display_email_count + " more"
        }

        return (
            <div className = "mdsp_ap_holder">
                <div className = "mdsp_ap_title">
                    Schedule Appointment
                </div>

                <div className = "mdsap_ap_row_border" />

                <div className = "mdsp_ap_row" style = {{height: 50}}>
                    <TextField
                        style = {{width: "95%", height: 40}}
                        color="primary"
                        variant="outlined"
                        className = "mds_ap_call_client"
                        placeholder="Client"
                        label="Client"

                        value={this.state.client_name}
                    />
                </div>

                <div className = "mdsp_ap_row">
                    <TextField
                        color="primary"
                        variant="outlined"
                        className = "mds_ap_call_subject"
                        placeholder="Call Subject"
                        label="Call Subject"

                        value={this.state.call_subject}
                        onChange = {(e) => {this.setState({call_subject: e.target.value})}}
                    />
                    <div className = "mdsp_ap_lead_container" onClick = {(e) => {this.handleMenuStatusClick(e, "employee")}}>
                        <div className = "mdsp_ap_lead_text">{this.state.assigned_employee}</div>
                    </div>
                </div>
                <div className = "mdsp_ap_row">
                    <TextField
                        id="date"
                        label="Appointment Date"
                        type="date"
                        color="primary"
                        variant="outlined"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        className = "mdsp_ap_date"
                        value={this.state.appointment_date}
                        onChange = {(e) => {this.setState({appointment_date: e.target.value})}}
                    />
                    <TextField
                        id="time"
                        label="Appointment Time"
                        type="time"
                        color="primary"
                        variant="outlined"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        inputProps={{
                            step: 300, // 5 min
                        }}
                        className = "mdsp_ap_datetime"
                        value={this.state.appointment_time}
                        onChange = {(e) => {this.setState({appointment_time: e.target.value})}}
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked = {this.state.flexible}
                                onChange = {() => this.setState({flexible: !this.state.flexible})}
                            />
                        }
                        label="Flexible"
                        className = "mdsp_ap_flexible"
                    />
                </div>
                <div className = "mdsp_ap_row" style = {{height: 50}}>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked = {this.state.alert}
                                onChange = {() => this.setState({alert: !this.state.alert})}
                            />
                        }
                        label={<div className = "mdsp_app_alert_text"><i className = "fa fa-bell" style = {{color: "red", marginRight: 5, fontSize: 22}}></i>Send 15 minute alert before appointment</div>}
                        className = "mdsp_ap_alert_checkbox"
                    />
                </div>

                <div className = "mdsap_ap_row_border" />

                <div className = "mdsp_ap_row" style = {{height: 30}}>
                    <div className = "mdsp_ap_invite_title">Send Invite:</div>
                    <FormControlLabel
                        control={
                            <Checkbox
                            checked = {this.state.send_invite_email}
                            onChange = {() => this.setState({send_invite_email: !this.state.send_invite_email})}
                            />
                        }
                        label="Email"
                        className = "mdsp_ap_invite_email"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                            checked = {this.state.send_invite_phone}
                            onChange = {() => this.setState({send_invite_phone: !this.state.send_invite_phone})}
                            />
                        }
                        label="SMS"
                        className = "mdsp_ap_invite_sms"
                    />
                </div>
                <div className = "mdsp_ap_row" style = {{height: 50}}>
                    <div className = "mdsp_ap_email_menu_selector_holder" onClick = {(e) => {this.handleMenuStatusClick(e, "email")}}>
                        <div className = "mdsp_ap_email_select">{display_select_email}</div>
                    </div>
                    <div className = "mdsp_ap_email_menu_selector_holder" onClick = {(e) => {this.handleMenuStatusClick(e, "phone")}}>
                    <div className = "mdsp_ap_phone_select">{display_select_phone}</div>
                    </div>
                </div>

                <div className = "mdsap_ap_row_border" />

                <div className = "mdsp_ap_row" style = {{height: 40}}>
                    <TextField
                        label="Client Phone Number"
                        disabled={true}
                        color="primary"
                        variant="outlined"
                        placeholder="Client Phone Number"
                        value="+1 (858) 668-6091"
                        style = {{width: "100%"}}
                        value={this.state.client_phone_number}
                        onChange = {(e) => {this.setState({client_phone_number: e.target.value})}}
                    /> 
                </div>

                <div className = "mdsp_ap_row">
                    <TextField
                        style = {{width: "100%", minHeight: 100}}
                        label="Notes"
                        color="primary"
                        variant="outlined"
                        multiline
                        rowsMax="4"
                        value={this.state.notes}
                        onChange = {(e) => {this.setState({notes: e.target.value})}}
                    />
                </div>

                <Button
                    color="primary"
                    variant="filled"
                    style = {{width: "40%", marginLeft: "30%"}}
                >
                    Create Appointment
                </Button>

                <Menu
                    id="long-menu"
                    anchorEl={anchor_status}
                    open={this.state.popup_employee}
                    onClose={() => {this.handleMenuStatusClose(null)}}
                    PaperProps={{
                        style: {
                        maxHeight: 375,
                        width: 250,
                        },
                    }}
                    >
                    {options_employee.map(option => (
                        <MenuItem key={option} selected={option === 'Pyxis'} onClick={() => {this.handleMenuStatusClose(option, "employee")}}>
                            {option}
                        </MenuItem>
                    ))}
                </Menu>

                <Menu
                    id="long-menu"
                    anchorEl={anchor_status}
                    open={this.state.popup_email}
                    onClose={() => {this.handleMenuStatusClose(null)}}
                    PaperProps={{
                        style: {
                        maxHeight: 375,
                        width: 250,
                        },
                    }}
                    >
                    {options_email.map(option => (
                        <MenuItem key={option} selected={option === 'Pyxis'}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        onChange = {() =>{this.setEmailSelect(option)}}
                                        checked={this.state.phone_select[option]}
                                    />
                                }
                                label={option}
                                className = "mdsp_ap_flexible"
                            />
                        </MenuItem>
                    ))}
                </Menu>

                <Menu
                    id="long-menu"
                    anchorEl={anchor_status}
                    open={this.state.popup_phone}
                    onClose={() => {this.handleMenuStatusClose(null)}}
                    PaperProps={{
                        style: {
                        maxHeight: 375,
                        width: 250,
                        },
                    }}
                    >
                    {options_sms.map(option => (
                        <MenuItem key={option} selected={option === 'Pyxis'}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        onChange = {() =>{this.setPhoneSelect(option)}}
                                        checked={this.state.phone_select[option]}
                                    />
                                }
                                label={option}
                                className = "mdsp_ap_flexible"
                            />
                        </MenuItem>
                    ))}
                </Menu>
            </div>
        )
    }
}