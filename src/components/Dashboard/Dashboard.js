import React from 'react';

// Importing animation library
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'; // ES6

// React Router...
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

// Importing the CSS
import '../../css/Dashboard/Dashboard.css';

// Importing the Popups
import Popup from 'reactjs-popup';

// Importing all of the Dashboard components
import DashboardToolbar from "./DashboardToolbar";
import DashboardSidebar from "./DashboardSidebar";

// Importing popups
import NotifyPopup from './Notifications/NotifyPopup';
import MessagePopup from './Notifications/MessagePopup';
import PhoneCallPopup from './Notifications/PhoneCallPopup';


// Importing all of the screens
import Appointments from "./Appointments/Appointments";
import ClientCommunication from "./ClientCommunication/ClientCommunication";
import Data from "./Data/Data";
import Email from "./Email/Email";
import EmployeeChat from "./EmployeeChat/EmployeeChat";
import MainDashboard from "./MainDashboard/MainDashboard";
import Notifications from "./Notifications/Notifications";
import Settings from "./Settings/Settings";
import DataSystem from "./DataSystem/DataSystem";
import CandidateDashboard from "./CandidateDashboard";

// Here is where we are defining all of the menu elements as well as their associated icons
// Note that this much match the object list order!
const dashboard_menu_titles = [
    {title: "Dashboard", icon: "list", route: "leads"},
    {title: "Client Communication", icon: "user", route: "client"},
    {title: "Notifications", icon: "bell-o", route: "notification"},
    {title: "Appointments", icon: "calendar-o", route: "appointment"},
    {title: "Email", icon: "envelope-o", route: "mail"},
    {title: "Data", icon: "line-chart", route: "data"},
    {title: "Employee Chat", icon: "comments-o", route: "chat"},
    {title: "Data System", icon: "database", route: "sys"},
    {title: "Settings", icon: "cogs", route: "setting"},
    {title: "Log-Out", icon: "sign-out", route: "exit"}
];

const dashboard_components = [
    <CandidateDashboard />,
    <ClientCommunication />,
    <Notifications />,
    <Appointments />,
    <Email />,
    <Data />,
    <EmployeeChat />,
    <DataSystem />,
    <Settings />
];

export default class Dashboard extends React.Component {

    constructor(props) {
        super(props);

        // Primary class for managing and supporting the controlling system architecture
        // We will have a couple of tools that allow us to control where we are
        // First and foremost will be the active index, a value that indicates where we are in the list of display components
        this.state = {
            active_index: 0,
            display: false,
            num_new_notifications: 0,
            num_new_messages: 0,
            force_stop_notification: false,
            notifications: null,

            user_info: {},


            display_notify_popup: false,
            display_message_popup: false,
            display_phone_popup: false,
            phone_popup_data: {}
        };

        // Binding functions go here
        this.setActiveIndex = this.setActiveIndex.bind(this);
        this.setNotifyPopup = this.setNotifyPopup.bind(this);
        this.setMessagePopup = this.setMessagePopup.bind(this);
        this.setPhonePopup = this.setPhonePopup.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        
    }

    // Function that manages the current state we are in
    // This allows us to switch states
    setActiveIndex(index, route) {
        let ref = this;
        // Index overrides
        if (index == dashboard_components.length) {
            this.setState({force_stop_notification: true}, () => {
                ref.props.logOut();
            });
            return;
        }

        if (route !== null && route !== undefined && route.length > 0)
            window.location.hash = route;

        this.setState({active_index: index});
    }

    componentWillMount() {
        let ref = this;
        setTimeout(function() {
            ref.setState({display: true});
            ref.getNotificationUpdates();
        }, 500)

        // Lets load our account information...
        this.getUserData();
    }

    componentDidMount() {
        this.loadLocationFromHash();
    }

    // Getting user account data for display purpsoes
    getUserData() {
        // Getting notifications
        let ref = this;

        // Creating the message
        let data = {
            "employee_auth": this.props.credentials['employee_auth'],
            "employee_id": this.props.credentials['employee_id']
        };
        data['target_employee_id'] = this.props.credentials['employee_id'];

        fetch('http://159.65.71.123:5000/employee/get', {
            method: 'post',
            body: JSON.stringify(data)
        })
            .then(function(response) {
            return response.json();
        })
        .then(function(myJson) {
            console.log(myJson);
            ref.setState({user_info: myJson['output']});
        });
    }

    // Notification popup
    setNotifyPopup(value, data) {
        console.log("Setting notification popup to " + value);
        this.setState({display_notify_popup: value})
    }

    // Phone Popup
    setPhonePopup(value, data) {
        this.setState({display_phone_popup: value})
    }

    // Notification popup
    setMessagePopup(value, data) {
        this.setState({display_message_popup: value})
    }

    // Function for getting updates from notifications!
    getNotificationUpdates() {

        if (this.state.force_stop_notification) {
            //console.log("Stopping updates");
            return;
        }

        // Getting notifications
        let ref = this;

        // Creating the message
        let data = {
            "employee_auth": this.props.credentials['employee_auth'],
            "employee_id": this.props.credentials['employee_id']
        };
        data['type'] = 'update';

        fetch('http://159.65.71.123:5000/notify/get', {
            method: 'post',
            body: JSON.stringify(data)
        })
            .then(function(response) {
            return response.json();
        })
        .then(function(myJson) {
            //console.log(myJson);

            // Checking if our process was invalidated
            if (myJson['code'] == 490) {
                ref.setActiveIndex(9);
                return;
            }

            // Getting message notification
            let message_data = myJson['output']['messages']
            let num_message = 0;
            for (let entry in message_data) {
                //console.log(message_data);
                //console.log(entry);
                let entry_value = message_data[entry];
                //console.log(entry_value);
                let num_message_entry = entry_value['new_message'];
                num_message = num_message + num_message_entry;
            }

            // Okay we have recieved notifications, time to update the number of notifications in our system...
            let num_notifications = myJson['output']['notifications'].length;

            // Checking if any of these notifications are for our phone system...
            let notification = myJson['output']['notifications'];
            for (let entry in notification) {
                let entry_value = notification[entry];

                // Checking if we have a phone push!
                if (entry_value['notify_push'] == 'inbound_call') {
                    
                    // WE GOTTA PUSH BOI
                    let phone_data = entry_value['notify_data'];
                    //console.log(phone_data);
                    phone_data = JSON.parse(phone_data);
                    ref.setState({notifications: notification, display_phone_popup: true, num_new_notifications: num_notifications, num_new_messages: num_message, phone_popup_data: phone_data});
                    return;
                }
            }

            ref.setState({num_new_notifications: num_notifications, num_new_messages: num_message})

            setTimeout(function() {
                ref.getNotificationUpdates();
            }, 5000);
        });
    }

    // This function is here for greater control over our state management...
    loadLeadFromID() {
        // Loading a lead from the initial database into the main system
        // This is an important part of the process!!!
    }

    // Dealing with has loading
    loadLocationFromHash() {
        if(window.location.hash) {
            // Fragment exists
            let location = window.location.hash.substring(1);
            
            // Splitting for datapoints...
            let location_hash_data = location.split('/');

            location = location_hash_data[0];

            // Setting our state if it exists
            for (let route_options in dashboard_menu_titles) {
                let route_options_entry = dashboard_menu_titles[route_options];
                if (route_options_entry['route'] === location) {
                    this.setActiveIndex(route_options);
                    break;
                }
            }


          } else {
            // Fragment doesn't exist
          }
    }

    render() {

        // Determining which of our main components to render
        let active_display = dashboard_components[this.state.active_index];

        // Cloning active display so we can pass in our datas
        let new_active_display = React.cloneElement(active_display, {user_info: this.state.user_info, credentials: this.props.credentials});

        console.log(new_active_display);
        

        // Hidding display
        let display = null;
        if (this.state.display) {
            display = 
            <Router>
                <div className = "dashboard_container">
                    <DashboardToolbar 
                        num_new_notifications = {this.state.num_new_notifications}
                        num_new_messages = {this.state.num_new_messages}
                        active_index = {this.state.active_index}
                        setActiveIndex = {this.setActiveIndex}
                        setNotifyPopup = {this.setNotifyPopup}
                        setMessagePopup = {this.setMessagePopup}
                        user_info = {this.state.user_info}
                    />
                    <DashboardSidebar 
                        active_index = {this.state.active_index}
                        dashboard_menu_titles = {dashboard_menu_titles}
                        setActiveIndex = {this.setActiveIndex}
                        user_info = {this.state.user_info}
                    />

                    {new_active_display}

                    <Popup
                        contentStyle = {{width: "80vw", height: "80vh"}}
                        open={this.state.display_notify_popup}
                        onClose={() => {this.setNotifyPopup(false,"")}}
                    >
                        <NotifyPopup data = {this.state.notifications} credentials = {this.props.credentials}/>
                    </Popup>

                    <Popup
                        contentStyle = {{width: "50vw", height: "80vh"}}
                        open={this.state.display_message_popup}
                        onClose={() => {this.setMessagePopup(false,"")}}
                    >
                        <MessagePopup />
                    </Popup>

                    <Popup
                        contentStyle = {{width: "50vw", height: "80vh"}}
                        open={this.state.display_phone_popup}
                        onClose={() => {this.setPhonePopup(false,"")}}
                    >
                        <PhoneCallPopup phone_data = {this.state.phone_popup_data} />
                    </Popup>
                </div>
            </Router>
        }

        // Final render display....
        return (
            <ReactCSSTransitionGroup
                    transitionName="example"
                    transitionAppear={true}
                    transitionAppearTimeout={500}
                    transitionEnter={true}
                    transitionLeave={true}>
                {display}
            </ReactCSSTransitionGroup>
        )
    }
}