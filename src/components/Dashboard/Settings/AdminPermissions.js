// This is a template for creating new reactJS files

// Importing React
import React from 'react';

// Importing the Popups
import Popup from 'reactjs-popup';
import Button from '@material-ui/core/Button';

// Importing base CSS
import "../../../css/Dashboard/Dashboard.css"
import "../../../css/Dashboard/Admin.css"

// Importing additonal components
import PermissionListSelect from "./PermissionListSelect";
import AdminGroupPopup from './AdminGroupPopup';

export default class AdminPermissions extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            groups: null,
            permission_default: null,
            
            active_index: 0,

            edit_permission_select: {},
            display_admin_group_popup: false
        }

        this.displayNewGroupPopup = this.displayNewGroupPopup.bind(this);
        this.onPermissionCheck = this.onPermissionCheck.bind(this);
        this.selectGroupEntry = this.selectGroupEntry.bind(this);
        this.saveGroup = this.saveGroup.bind(this);
    }

    // Loading the nice popup
    displayNewGroupPopup(value) {
        this.setState({display_admin_group_popup: value});
    }    // Admin group popup

    // On load
    componentDidMount() {
        this.loadPermissionGroups();
        this.loadDefaultPermissionSet();
    }

    // Callback function for when permissions are checked
    onPermissionCheck(type, value) {
        let update_permission_select = this.state.edit_permission_select;
        update_permission_select[type] = value;

        this.setState({edit_permission_select: update_permission_select});
    }

    // Loading the permission default set
    loadDefaultPermissionSet() {
        // Loading permission groups
        let ref = this;

        // Creating the data
        let data = {
            "employee_auth": this.props.credentials['employee_auth'],
            "employee_id": this.props.credentials['employee_id']
        };

        // Getting messages
        console.log("Getting permission groups...");

        fetch('http://159.65.71.123:5000/permission/default', {
            method: 'post',
            body: JSON.stringify(data)
        })
            .then(function(response) {
            return response.json();
        })
        .then(function(myJson) {
            console.log("GROUP RESULTS");
            console.log(myJson);

            ref.setState({permission_default: myJson['output']})

        });
    }

    // Loading all of the required information...
    loadPermissionGroups() {
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

            ref.setState({groups: myJson['output']})

        });
    }

    convertToInteger(set) {
        let output = set;
        for (let entry in set) {
            let value = set[entry];

            let val = 0;
            if (value)
                val = 1;

            output[entry] = val;
        }

        return output;
    }

    saveGroup(name, set) {


        // Converting set from booleans to integers

        // Loading permission groups
        let ref = this;

        // Creating the data
        let data = {
            "employee_auth": this.props.credentials['employee_auth'],
            "employee_id": this.props.credentials['employee_id']
        };

        data['group_name'] = name;
        data['group_permission_set'] = this.convertToInteger(set);

        // Getting messages
        console.log("Adding permission group...");

        fetch('http://159.65.71.123:5000/employee/group/add', {
            method: 'post',
            body: JSON.stringify(data)
        })
            .then(function(response) {
            return response.json();
        })
        .then(function(myJson) {

            // Loading permission group
            setTimeout(function() {
                ref.loadPermissionGroups();
                ref.displayNewGroupPopup(false)
            }, 500)


        });
    }

    // Group management
    updateActiveGroup() {
        // Loading permission groups
        let ref = this;

        // Creating the data
        let data = {
            "employee_auth": this.props.credentials['employee_auth'],
            "employee_id": this.props.credentials['employee_id']
        };

        data['group_id'] = this.state.groups[this.state.active_index]['group_id'];
        data['group_name'] = this.state.groups[this.state.active_index]['group_name'];
        data['group_permission_set'] = this.convertToInteger(this.state.edit_permission_select);

        // Getting messages
        console.log("Adding permission group...");

        fetch('http://159.65.71.123:5000/employee/group/update', {
            method: 'post',
            body: JSON.stringify(data)
        })
            .then(function(response) {
            return response.json();
        })
        .then(function(myJson) {

            // Loading permission group
            alert("Updated successfully")
            setTimeout(function() {
                ref.loadPermissionGroups();
            }, 500)


        });
    }

    deleteActiveGroup() {
        // Loading permission groups
        let ref = this;

        // Moving our active state to zero
        this.setState({active_index: 0});

        // Creating the data
        let data = {
            "employee_auth": this.props.credentials['employee_auth'],
            "employee_id": this.props.credentials['employee_id']
        };

        data['group_id'] = this.state.groups[this.state.active_index]['group_id'];

        // Getting messages
        console.log("Adding permission group...");

        fetch('http://159.65.71.123:5000/employee/group/delete', {
            method: 'post',
            body: JSON.stringify(data)
        })
            .then(function(response) {
            return response.json();
        })
        .then(function(myJson) {

            // Loading permission group
            alert("Deleted successfully")
            setTimeout(function() {
                ref.loadPermissionGroups();
            }, 500)


        });
    }

    selectGroupEntry(index) {
        // First updating our group select, then the active index
        let group_permissions = JSON.parse(JSON.stringify(this.state.groups[index]['group_permission_set']));
        this.setState({edit_permission_select: group_permissions, active_index: index});
    }

    render() {

        // Not displaying if still loading
        if (this.state.groups === null || this.state.permission_default === null) {
            return (
                <div className = "admin_container"></div>
            )
        }

        let delete_button = <Button 
            className = "button_holder_update_group_delete"
            variant="contained"
            color="primary"
            onClick = {() => {this.deleteActiveGroup()}}
        >
            Delete {this.state.groups[this.state.active_index]['group_name']}
        </Button>

        // Checking if we are at zero
        if (this.state.active_index === 0) {
            delete_button = null
        }
        
        return (
            <div className = "admin_container">
                <GroupList selectGroupEntry = {this.selectGroupEntry} displayNewGroupPopup = {this.displayNewGroupPopup} active_index = {this.state.active_index} groups = {this.state.groups}/>

                <div className = "permission_list_select_holder">
                    <PermissionListSelect display_permission = {this.state.edit_permission_select} permission_list = {this.state.permission_default} onPermissionCheck = {this.onPermissionCheck}/>
                </div>

                <Popup
                    contentStyle = {{width: "50vw", height: "80vh"}}
                    open={this.state.display_admin_group_popup}
                    onClose={() => {this.displayNewGroupPopup(false,"")}}
                >
                    <AdminGroupPopup saveGroup = {this.saveGroup} close = {this.displayNewGroupPopup} permission_default = {this.state.permission_default}/>
                </Popup>

                <div className = "button_holder_update_permission">
                    <Button 
                        className = "button_holder_update_group"
                        variant="contained"
                        color="primary"
                        onClick = {() => {this.updateActiveGroup()}}
                    >
                        Save Changes to {this.state.groups[this.state.active_index]['group_name']}
                    </Button>

                    {delete_button}
                </div>
            </div>
        )
    }
}

class GroupList extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        // Building the list
        let group_display_list = [];
        for (let i = 0; i < this.props.groups.length; i++) {

            // Custom styling for active group
            if (this.props.active_index === i) {
                // Custom styling!
            }
            
            let tmp_group = <GroupListEntry selectGroupEntry = {this.props.selectGroupEntry} key = {i} index = {i} active_index = {this.props.active_index} group_title = {this.props.groups[i]['group_name']} />
            group_display_list.push(tmp_group);
        }


        return (
            <div className = "group_list_holder">
                <div className = "group_list_title">Groups</div>
                {group_display_list}

                <div className = "horizontal_line" />
                
                <div className = "group_list_entry" onClick = {() => {this.props.displayNewGroupPopup(true)}}>
                    <div className = "fa fa-plus group_users_icon" />
                    <div className = "group_list_entry_text">New Group</div>
                </div>
            </div>
        )
    }
}

class GroupListEntry extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let holder_class = "group_list_entry";
        if (this.props.index === this.props.active_index) {
            holder_class = "group_list_entry active_group_entry";
        }

        return (
            <div className = {holder_class} onClick = {() => {this.props.selectGroupEntry(this.props.index)}}>
                <div className = "fa fa-users group_users_icon" />
                <div className = "group_list_entry_text">{this.props.group_title}</div>
            </div>
        )
    }
}