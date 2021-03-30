// This is a template for creating new reactJS files

// Importing React
import React from 'react';

import SearchBar from "../../SearchBar";

// Importing base CSS
import "../../../css/Dashboard/Dashboard.css"
import "../../../css/Dashboard/Notifications.css"

export default class Notifications extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className = "primary_container">
                <div className = "dashboard_title_holder">
                    Notifications
                </div>

                <div className = "searchbar_holder">
                    <SearchBar />
                </div>

            </div>
        )
    }
}