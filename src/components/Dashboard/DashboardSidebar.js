// Importing React
import React from 'react';

// Importing the CSS
import "../../css/Dashboard/DashboardSidebar.css";

// Importing lower level components
import DashboardNav from "./DashboardNav";

export default class DashboardSidebar extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className = "dashboard_sidebar_holder">
                <div className = "dashboard_sidebar_top">

                    <div className = "dashboard_user_info_holder">
                        <img className = "profile_image" src = {require("../../assets//img/profile_circle.png")} color = "primary"/>
                        <div className = "name_holder" >{this.props.user_info['employee_name']}</div>
                        <div className = "title_holder">{this.props.user_info['employee_title']}</div>
                    </div>

                    <div className = "user_statistics_holder">
                        <div className = "total_calls_holder">
                            <div className = "stats_value">
                                235
                            </div>
                            <div className = "stats_title">
                                Total Calls
                            </div>
                        </div>
                        <div className = "app_conversion_holder">
                            <div className = "stats_value">
                                98%
                            </div>
                            <div className = "stats_title">
                                Conversion Rate
                            </div>
                        </div>
                    </div>
                </div>

                <DashboardNav 
                    active_index = {this.props.active_index}
                    dashboard_menu_titles = {this.props.dashboard_menu_titles}
                    setActiveIndex = {this.props.setActiveIndex}
                />
            </div>
        )
    }
}