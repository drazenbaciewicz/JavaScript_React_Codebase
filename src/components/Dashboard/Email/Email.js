// This is a template for creating new reactJS files

// Importing React
import React from 'react';

// Importing extras
import EmailSidebar from "./EmailSidebar";
import SearchBar from "../../SearchBar";

// Importing base CSS
import "../../../css/Dashboard/Dashboard.css"
import "../../../css/Dashboard/Email.css"

export default class Email extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className = "primary_container">
                <div className = "dashboard_title_holder">
                    Email

                    <div className = "searchbar_holder">
                        <SearchBar />
                    </div>
                </div>

                <br/>
                <br/>
                <br/>
                <br/>
            </div>
        )
    }
}