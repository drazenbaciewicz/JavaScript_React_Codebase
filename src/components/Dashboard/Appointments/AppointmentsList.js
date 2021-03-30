
// Importing React
import React from 'react';

// Importing list
import List from "../List.js";

export default class AppointmentsList extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <List 
                    header = {["ID", "LEAD", "DATE", "OPENER", "STATUS", "SUBJECT", "LEAD PHONE"]}
                    listHeaderClassName = "listFull"
                    className = "settings_team_list"
                    width = {[30, 150, 200, 150, 100, 200, 200]}
                    checked_data = {{}}
                />
            </div>
        )
    }
}