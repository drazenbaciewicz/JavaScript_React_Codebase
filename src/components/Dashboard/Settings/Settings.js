// This is a template for creating new reactJS files

// Importing React
import React from 'react';

// Importing Material UI
import TopBar from "../../TopBar.js";
import SearchBar from "../../SearchBar";

// Importing the views
import SettingsAccount from "./SettingsAccount.js";
import SettingsTeam from "./SettingsTeam.js";
import AdminEmployee from "./AdminEmployee";
import AdminPermissions from "./AdminPermissions";

// Importing base CSS
import "../../../css/Dashboard/Dashboard.css"
import "../../../css/Dashboard/Settings.css"

const tabs = ["My Account", "Employees", "Groups"];
const topbar_icons = ["user","address-card","cog"];

export default class Settings extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            app_value: tabs[0],
            search_text_filter: ""
        };

        this.handleAppBarChange = this.handleAppBarChange.bind(this);
        this.onTextfieldChange = this.onTextfieldChange.bind(this);
    }

    handleAppBarChange(value) {
        this.setState({app_value: value});
    }

    onTextfieldChange(value) {
        this.setState({search_text_filter: value});
    }

    render() {

        // Building the app value object
        let app_value = this.state.app_value;

        return (
            <div className = "primary_container">
                <div className = "dashboard_title_holder">
                    Settings
                </div>

                <div className = "searchbar_holder">
                    <SearchBar 
                        onTextfieldChange = {this.onTextfieldChange}
                    />
                </div>

                <br/>
                <br/>
                <br/>
                <br/>

                <TopBar 
                    tabs = {tabs}
                    value = {app_value}
                    onChange = {this.handleAppBarChange}
                    icons = {topbar_icons}
                />
                {app_value === tabs[0] && <SettingsAccount search_text_filter = {this.state.search_text_filter} user_info = {this.props.user_info} credentials = {this.props.credentials} />}
                {app_value === tabs[1] && <SettingsTeam search_text_filter = {this.state.search_text_filter} credentials = {this.props.credentials} />}
                {app_value === tabs[2] && <AdminPermissions search_text_filter = {this.state.search_text_filter} user_info = {this.props.user_info} credentials = {this.props.credentials} />}
                {app_value === tabs[3] && <AdminEmployee search_text_filter = {this.state.search_text_filter} credentials = {this.props.credentials} />}


            </div>
        )
    }
}