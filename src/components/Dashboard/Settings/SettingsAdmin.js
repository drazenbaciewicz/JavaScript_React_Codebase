// This is a template for creating new reactJS files

// Importing React
import React from 'react';

// Importing base CSS
import "../../../css/Dashboard/Dashboard.css"
import "../../../css/Dashboard/Settings.css"

// Importing external components
import AdminEmployee from "./AdminEmployee";
import AdminPermissions from "./AdminPermissions";

// TopBar imports
import TopBar from "../../TopBar.js";
const tabs = ["Permissions", "Employees"];

export default class SettingsAdmin extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            app_value: tabs[0]
        };

        this.handleAppBarChange = this.handleAppBarChange.bind(this);
    }

    handleAppBarChange(value) {
        this.setState({app_value: value});
    }

    render() {

        let app_value = this.state.app_value;

        return (
            <div className = "admin_container">

                <br/>
                <br/>
                <br />

                <TopBar 
                    tabs = {tabs}
                    value = {app_value}
                    onChange = {this.handleAppBarChange}
                />
                {app_value === tabs[0] && <AdminPermissions user_info = {this.props.user_info} credentials = {this.props.credentials} />}
                {app_value === tabs[1] && <AdminEmployee credentials = {this.props.credentials} />}

            </div>
        )
    }
}