// Importing React
import React from 'react';

// Importing the CSS
import "../../css/Dashboard/DashboardToolbar.css";

// Importing Font-Awesome
import 'font-awesome/css/font-awesome.min.css';

// Importing the Material UI
import Badge from '@material-ui/core/Badge';


export default class DashboardToolbar extends React.Component {
    constructor(props) {
        super(props);
    }

    // Some important properties we are supposed to be given...
    // Number of new messages..
    // Number of new notifications...

    render() {

        // Disabling the notifications if we don't have any notifications...
        let toolbar_notification =
        <div className = "toolbar_notification_holder" onClick = {() => {this.props.setNotifyPopup(true, "")}}>
            <Badge className = "toolbar_badge" badgeContent={this.props.num_new_notifications}>
                <i className="fa fa-bell-o toolbar_icon_40" aria-hidden="true"></i>
            </Badge>
        </div>;

        let toolbar_message = 
        <div className = "toolbar_message_holder" onClick = {() => {this.props.setMessagePopup(true, "")}}>
            <Badge className = "toolbar_badge" color="primary" badgeContent={this.props.num_new_messages}>
                <i style = {{color: "#27486E"}}className="fa fa-comments-o toolbar_icon_45" aria-hidden="true"></i>
            </Badge>
        </div>;

        if (this.props.num_new_messages <= 0) {
            toolbar_message = 
            <div className = "toolbar_notification_holder" onClick = {() => {this.props.setNotifyPopup(true, "")}}>
            <Badge className = "toolbar_badge" color="primary" badgeContent={this.props.num_new_notifications}>
                <i style = {{color: "#27486E"}} className="fa fa-bell-o toolbar_icon_40_disabled" aria-hidden="true"></i>
            </Badge>
        </div>;
        }
        if (this.props.num_new_notifications <= 0) {
            toolbar_notification = 
            <div className = "toolbar_message_holder" onClick = {() => {this.props.setMessagePopup(true, "")}}>
            <Badge className = "toolbar_badge" color="primary" badgeContent={this.props.num_new_messages}>
                <i style = {{color: "#27486E"}}className="fa fa-comments-o toolbar_icon_45_disabled" aria-hidden="true"></i>
            </Badge>
        </div>;
        }
        return (
            <div className = "dashboard_toolbar_holder">
                {toolbar_notification}
                {toolbar_message}
                <div className = "toolbar_logo_holder">
                    <img className = "toolbar_logo_image" color = "primary" src = {require("../../assets/img/logo_no_text.png")} />
                </div>
        
            </div>
        )
    }
}