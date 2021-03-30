// This is a template for creating new reactJS files

// Importing React
import React from 'react';

// Importing Material UI
import TopBar from "../../TopBar.js";
import SearchBar from "../../SearchBar";

// Importing base CSS
import "../../../css/Dashboard/Dashboard.css"
import "../../../css/Dashboard/Appointments.css"

// Importing our extra components
import AppointmentsCalendar from "./AppointmentsCalendar";
import AppointmentsList from "./AppointmentsList";

const tabs = ["Calendar", "List"];
const topbar_icons = ["calendar","list"];

export default class Appointments extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            app_value: tabs[0],
            appointment_data: {}
        };

        this.handleAppBarChange = this.handleAppBarChange.bind(this);
        this.getAllAppointments = this.getAllAppointments.bind(this);
    }

    handleAppBarChange(value) {
        this.setState({app_value: value});
    }

    // Make call to appointment endpoint
    getAllAppointments() {

    }

    componentDidMount() {
        this.getAllAppointments();
    }

    render() {

        // Building the app value object
        let app_value = this.state.app_value;

        return (
            <div className = "primary_container">
                <div className = "dashboard_title_holder">
                    Appointments

                    <div className = "searchbar_holder">
                        <SearchBar />
                    </div>
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
                
                {app_value === tabs[0] && <AppointmentsCalendar user_info = {this.props.user_info} credentials = {this.props.credentials} />}
                {app_value === tabs[1] && <AppointmentsList user_info = {this.props.user_info} credentials = {this.props.credentials} />}

            </div>
        )
    }
}