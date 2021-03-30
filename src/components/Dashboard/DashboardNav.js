// Importing React
import React from 'react';

// Router
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

// Importing the CSS
import "../../css/Dashboard/DashboardNav.css";

class DashboardNavList extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        let is_active_styling = null;
        let icon_color = "#27486E";

        if (this.props.index == this.props.active_index) {
            is_active_styling = "active"
            icon_color = "#27486E";
        }

        let route = this.props.route;

        return (
            <div to = {"/" + this.props.route + "/"} className = {"dashboard_nav_list_element " + is_active_styling} onClick = {() => {this.props.setActiveIndex(this.props.index, route)}}>
                <i style = {{color: "#27486E"}} className = {"navbar_icon fa fa-" + this.props.icon} aria-hidden="true"></i>
                <div className = "nav_list_title">{this.props.title}</div>
            </div>
        )
    }
}

export default class DashboardNav extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        // Building the display list from the given props
        let list_holder = []

        for (let entry in this.props.dashboard_menu_titles) {
            let value = this.props.dashboard_menu_titles[entry];

            // Building from the given information
            let title = value.title;
            let icon = value.icon;
            let route = value.route;

            let new_list_element = 
            <DashboardNavList 
                setActiveIndex = {this.props.setActiveIndex} 
                active_index = {this.props.active_index} 
                index = {entry} 
                key = {entry} 
                title = {title} 
                icon = {icon}
                route = {route}
            />

            list_holder.push(new_list_element);
        }
        return (
            <div className = "dashboard_nav_holder">
                <div className = "dashboard_nav_title">
                    Active Screens
                    <div className = "dashboard_minimize_button">
                        <i style = {{color: "#27486E"}} className = {"navbar_icon fa fa-REPLACE_ME_WHEN_READY"} aria-hidden="true"></i>
                    </div>
                </div>
                {list_holder}

                <div className = "dashboard_nav_side_filler">
                </div>


                
            </div>
        )
    }
}