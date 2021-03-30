// This is a template for creating new reactJS files

// Importing React
import React from 'react';

// Importing the Popups
import Popup from 'reactjs-popup';
import Button from '@material-ui/core/Button';

// Importing base CSS
import "../../../css/Dashboard/Dashboard.css"
import "../../../css/Dashboard/Settings.css"

// External components
import SettingsAccount from "./SettingsAccount";

// Importing list
import List from "../List.js";

// Header reference constant
const header_reference = ["employee_id", "employee_name", "employee_title", "employee_email", "employee_phone_number", "group_name"];

export default class SettingsTeam extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            team_data: [],
            json_employee_data: [],
            raw_team_data: {},

            new_user_info: {
                "employee_phone_number": ""
            },
            group_list: {},

            displayAddEmployeePopup: false,
            display_edit_employee_popup: false
        }

        this.displayAddEmployeePopup = this.displayAddEmployeePopup.bind(this);
        this.addEmployee = this.addEmployee.bind(this);
        this.editEmployee = this.editEmployee.bind(this);
        this.deleteEmployee = this.deleteEmployee.bind(this);
        this.handleCheck = this.handleCheck.bind(this);
    }

    componentDidMount() {
        this.getPermissionGroups();
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
        //console.log("Getting employees!");

        fetch('http://159.65.71.123:5000/employee/get', {
            method: 'post',
            body: JSON.stringify(data)
        })
            .then(function(response) {
            return response.json();
        })
        .then(function(myJson) {
            //console.log("TEAM:");

            
            //console.log(myJson);

            // Fixing this because its dumb fml
            let output = [];
            let raw_tm_data = {}

            for (let entry in myJson['output']) {
                let new_entry = {}
                let entry_value = myJson['output'][entry];
                //console.log(entry_value);

                raw_tm_data[myJson['output'][entry]['employee_id']] = myJson['output'][entry];

                // Building the name from the details we've gotten
                let name = myJson['output'][entry]['employee_name'];
                let first_name = name.substring(0, name.indexOf(" "));
                let last_name = name.substring(name.indexOf(" ") + 1);

                new_entry[0] = myJson['output'][entry]['employee_id'];
                new_entry[1] = first_name;
                new_entry[2] = last_name;
                new_entry[3] = myJson['output'][entry]['employee_title'];
                new_entry[4] = myJson['output'][entry]['employee_email'];
                new_entry[5] = myJson['output'][entry]['employee_phone_number'];
                new_entry[6] = "Dec 25th 2018";
                new_entry[7] = myJson['output'][entry]['employee_permission_group_id'];
                output.push(new_entry);
            }
            ref.setState({raw_team_data: raw_tm_data})
            ref.setState({team_data: output});
            

            ref.setState({json_employee_data: myJson['output']});
        });
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

        fetch('http://159.65.71.123:5000/employee/group/get', {
            method: 'post',
            body: JSON.stringify(data)
        })
            .then(function(response) {
            return response.json();
        })
        .then(function(myJson) {

            ref.setState({group_list: myJson['output']})

        });
    }


    displayAddEmployeePopup(value) {
        this.setState({display_add_employee_popup: value});
    }

    displayEditEmployeePopup(value) {
        this.setState({display_edit_employee_popup: value});
    }

    addEmployee(employee_data) {

        // Making the edit call...
        let ref = this;

        let data = {
            "employee_auth": this.props.credentials['employee_auth'],
            "employee_id": this.props.credentials['employee_id'],

            "username": employee_data['emeployee_username'],
            "password": "XXX",
            "name": employee_data['employee_name'],
            "employee_2fa": 1,
            "employee_email": employee_data['employee_email'],
            "employee_phone_number": employee_data['employee_phone_number'],
            "employee_title": employee_data['employee_title'],
            "employee_permission_group_id": employee_data['employee_permission_group_id'],
            "employee_phone_route": employee_data['employee_phone_route']
        };

        fetch('http://159.65.71.123:5000/employee/create', {
            method: 'post',
            body: JSON.stringify(data)
        })
            .then(function(response) {
            return response.json();
        })
        .then(function(myJson) {
            ref.getEmployeeList();
            ref.displayAddEmployeePopup(false);
        });
    }

    deleteEmployee() {

        // Getting the selected employee ID

        let target_employee_id = this.state.employee_checked_index;

        // Making the edit call...
        let ref = this;
        
        let data = {
            "employee_auth": this.props.credentials['employee_auth'],
            "employee_id": this.props.credentials['employee_id'],
            "target_employee_id": target_employee_id
        };

        fetch('http://159.65.71.123:5000/employee/disable', {
            method: 'post',
            body: JSON.stringify(data)
        })
            .then(function(response) {
            return response.json();
        })
        .then(function(myJson) {
            ref.getEmployeeList();
            ref.displayEditEmployeePopup(false);
        });
    }

    editEmployee(employee_data) {

        // Fixing the employee data
        let target_employee_id = employee_data['employee_id'];
        
        let edit_output_data = JSON.parse(JSON.stringify(employee_data))
        delete(edit_output_data['employee_id']);
        delete(edit_output_data['group_name']);

        // Deleting our group_id if it exists


        // Making the edit call...
        console.log(edit_output_data);
        let ref = this;

        let data = {
            "employee_auth": this.props.credentials['employee_auth'],
            "employee_id": this.props.credentials['employee_id'],
            "edit": edit_output_data,
            "target_employee_id": target_employee_id
        };

        fetch('http://159.65.71.123:5000/employee/edit', {
            method: 'post',
            body: JSON.stringify(data)
        })
            .then(function(response) {
            return response.json();
        })
        .then(function(myJson) {
            ref.getEmployeeList();
            ref.displayEditEmployeePopup(false);
        });
    }

    handleCheck(index, data) {
        this.setState({checked_index: index, employee_checked_index: data});
    }

    canEditEmployee() {
        if (this.state.checked_index !== undefined && this.state.checked_index !== null) {
            return true;
        }

        return false;
    }

    render() {
        // Building the checked array
        let checked_array = {};
        if (this.canEditEmployee())
            checked_array[this.state.checked_index] = 1;

        // Adding the group into the list display...
        let team_display = JSON.parse(JSON.stringify(this.state.json_employee_data));
        for (let entry in this.state.json_employee_data) {
            let group_id = this.state.json_employee_data[entry]["employee_permission_group_id"];
            let group_name = "Missing!";

            for (let group in this.state.group_list) {
                let group_obj = this.state.group_list[group];
                if (group_obj['group_id'] === group_id)
                    group_name = group_obj['group_name'];
            }
            
            // Updating it now...
            team_display[entry]['group_name'] = group_name;
        }

        return (
            <div className = "settings_container">

            <Popup
                contentStyle = {{width: "60vw", height: "50vh", padding: "50px"}}
                open={this.state.display_add_employee_popup}
                onClose={() => {this.displayAddEmployeePopup(false,"")}}
            >
                <SettingsAccount credentials = {this.props.credentials} onSave = {this.addEmployee} edit_mode = {true} user_info = {this.state.new_user_info}/>
            </Popup>

            <Popup
                contentStyle = {{width: "60vw", height: "50vh", padding: "50px"}}
                open={this.state.display_edit_employee_popup}
                onClose={() => {this.displayEditEmployeePopup(false,"")}}
            >
                <SettingsAccount credentials = {this.props.credentials} onSave = {this.editEmployee} edit_mode = {true} user_info = {this.state.employee_checked_index}/>
            </Popup>

                <div className = "settings_team_button_holder">
                    <Button
                        variant="contained"
                        color="primary"
                        className = "button_team_add_employee"
                        onClick = {() => {this.displayAddEmployeePopup(true)}}
                    >
                        <div className = "settings_team_button_icon fa fa-plus" />Add Employee
                    </Button>
                    
                    <Button
                        variant="contained"
                        color="primary"
                        className = "button_team_edit_employee"
                        disabled = {!this.canEditEmployee()}
                        onClick = {() => {this.displayEditEmployeePopup(true)}}
                    >
                        <div className = "settings_team_button_icon fa fa-cog" />Edit Employee
                    </Button>

                    <Button
                        variant="contained"
                        color="secondary"
                        className = "button_team_delete_employee"
                        disabled = {!this.canEditEmployee()}
                        onClick = {() => {this.deleteEmployee()}}
                    >
                        <div className = "settings_team_button_icon fa fa-trash" />Disable Employee
                    </Button>
                </div>
                <div className = "settings_team_container">

                    <List 
                        header = {["ID", "FULL NAME", "TITLE", "EMAIL", "PHONE", "GROUP"]}
                        header_reference = {header_reference}

                        listHeaderClassName = "listFull"
                        className = "settings_team_list"
                        data = {team_display}
                        width = {[30, 200, 200, 180, 160, 160]}
                        checked_data = {checked_array}
                        onRowClick={() => {console.log("Clicked")}}

                        handleCheck = {this.handleCheck}
                        search_text_filter = {this.props.search_text_filter}
                    />
                </div>
            </div>
        )
    }
}