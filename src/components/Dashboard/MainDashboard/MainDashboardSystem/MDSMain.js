// Importing base react
import React from 'react';

// Importing components
import TopBar from "../../../TopBar";
import MDSGeneral from "./MDSGeneral";
import MDSApplication from "./MDSApplication";
import MDSBudget from "./MDSBudget";

// Importing the popups
import MDSPAppointment from "../../Notifications/MDSPopup/MDSPAppointment";
import MDSPCall from "../../Notifications/MDSPopup/MDSPCall";
import MDSPMessage from "../../Notifications/MDSPopup/MDSPMessage";
import MDSPMail from "../../Notifications/MDSPopup/MDSPMail";
import MDSPVoicecall from "../../Notifications/MDSPopup/MDSPVoicecall";

// Importing the Popups
import Popup from 'reactjs-popup';

// Importing the CSS
import "../../../../css/Dashboard/MainDashboardSystem/MDSMain.css";

// Building topbar constants
const tabs = ["General", "Application", "Budget"];
const topbar_icons = ["user","list", "money"];

export default class MDSMain extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            app_value: tabs[0],
            display_popup: false,
            popup_type: ""
        }

        this.handleAppBarChange = this.handleAppBarChange.bind(this);
        this.setPopupState = this.setPopupState.bind(this);
    }

    // Function that returns the component for the popup display
    getPopupDisplay() {
        let popup_return = <div>ERROR: INVALID POPUP DISPLAY</div>;

        if (this.state.popup_type === "appointment") {
            popup_return = <MDSPAppointment />
        }
        else if (this.state.popup_type === "call") {
            popup_return = <MDSPCall />
        }
        else if (this.state.popup_type === "message") {
            popup_return = <MDSPMessage />
        }
        else if (this.state.popup_type === "voicecall") {
            popup_return = <MDSPVoicecall />
        }
        else if (this.state.popup_type === "mail") {
            popup_return = <MDSPMail />
        }

        return popup_return;
    }

    setPopupState(value, type) {
        this.setState({
            display_popup: value,
            popup_type: type
        })
    }

    handleAppBarChange(value) {
        this.setState({app_value: value});
    }

    render() {

        // Building the app value object
        let app_value = this.state.app_value;

        console.log(this.props.data);

        // Handling popup stuff here...
        let popup = this.getPopupDisplay();

        return (
            <div className = "mds_main_holder">

                <br/>
                <br/>

                <TopBar 
                    tabs = {tabs}
                    value = {app_value}
                    onChange = {this.handleAppBarChange}
                    icons = {topbar_icons}
                    className = "mdsp_popup"
                    color = "primary"
                />

                <Popup
                    open={this.state.display_popup}
                    onClose={() => {this.setPopupState(false,"")}}
                >
                    {popup}
                </Popup>

                {app_value === tabs[0] && <MDSGeneral modifyUserData = {this.props.modifyUserData} setPopupState = {this.setPopupState} data = {this.props.data} credentials = {this.props.credentials} />}
                {app_value === tabs[1] && <MDSApplication modifyUserData = {this.props.modifyUserData} setPopupState = {this.setPopupState} data = {this.props.data} credentials = {this.props.credentials} />}
                {app_value === tabs[2] && <MDSBudget modifyUserData = {this.props.modifyUserData} setPopupState = {this.setPopupState} data = {this.props.data} credentials = {this.props.credentials} />}
            </div>
        )
    }
}