// Importing React
import React from 'react';

// Material UI
import Checkbox from '@material-ui/core/Checkbox';

// CSS
import "../../../css/Dashboard/Admin.css"

export default class PermissionListSelect extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {

        // Building the display list...
        let permission_select_list = []
        for (let i = 0; i < this.props.permission_list.length; i++) {

            // Determining checked value
            let display_checked = false;
            if (this.props.display_permission !== null && this.props.display_permission !== undefined && this.props.display_permission.hasOwnProperty(this.props.permission_list[i])) {
                display_checked = this.props.display_permission[this.props.permission_list[i]];
            }

            let new_permission_entry = <PermissionSelectEntry checked = {display_checked} onPermissionCheck = {this.props.onPermissionCheck} key = {i} title = {this.props.permission_list[i]}/>

            permission_select_list.push(new_permission_entry);
        }

        console.log(permission_select_list);

        return (
            <div className = "permission_inner_holder">
                <div className = "permission_list_select_title">
                    Permission List
                </div>

                <div className = "permission_select_entry_container">
                    {permission_select_list}
                </div>
            </div>
        )
    }
}

class PermissionSelectEntry extends React.Component {
    constructor(props) {
        super(props);
    }

    uppercaseFirst(string) { return string.charAt(0).toUpperCase() + string.slice(1); }

    displayTitleCommon(title) {
        // Removing all of the underscores
        let new_title = title.replace(/_/g, ' ');
        new_title = this.uppercaseFirst(new_title);
        return new_title;
    }

    render() {
        return (
            <div className = "permission_select_entry_holder" onClick = {() => {this.props.onPermissionCheck(this.props.title, !this.props.checked)}}>
                
                <div className = "permission_select_entry_text">
                    {this.displayTitleCommon(this.props.title)}
                </div>

                <Checkbox className = "permission_select_entry_checkbox" checked = {this.props.checked} color="primary"/>
            </div>
        )
    }
}