// This is a template for creating new reactJS files

// Importing React
import React from 'react';

// Importing base CSS
import "../../../css/Dashboard/Dashboard.css"
import "../../../css/Dashboard/DataSystem.css"


export default class DataSystem extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className = "primary_container">
                <div className = "dashboard_title_holder">
                    Data System
                </div>
            </div>
        )
    }

}