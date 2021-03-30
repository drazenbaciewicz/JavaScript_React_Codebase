// File for displaying all of the client communications with Calls

// Importing React
import React from 'react';

// Importing material-ui

// Importing CSS
import "../../../css/Dashboard/Dashboard.css"
import "../../../css/Dashboard/ClientCommunication.css"

// Importing external components
import List from "../List"

// Importing tools
import { displayPhoneFriendly } from "../../Tools";

// Header reference
let header_reference = ['call_id', 'call_type', 'call_start', 'call_time_display', 'call_inbound_number', 'call_target_number', 'client_id', 'client_name'];

export default class ClientCommunicationCall extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            calls: []
        }
    }

    // Loading call list
    componentDidMount() {
        this.getCallsList()
    }

    // Getting employee list from which to add employees to
    getCallsList() {
        let ref = this;

        // Creating the data
        let data = {
            "employee_auth": this.props.credentials['employee_auth'],
            "employee_id": this.props.credentials['employee_id']
        };
        data['call_id'] = "self";

        // Getting messages
        console.log("Getting employees!");

        fetch('http://159.65.71.123:5000/call/get', {
            method: 'post',
            body: JSON.stringify(data)
        })
            .then(function(response) {
            return response.json();
        })
        .then(function(myJson) {
            console.log(myJson);

            // Fixing this because its dumb fml
            let output = [];

            for (let entry in myJson['output']) {
                let new_entry = {}
                let entry_value = myJson['output'][entry];
                console.log(entry_value);

                // Building the name from the details we've gotten
                new_entry['call_id'] = entry_value['call_id']
                new_entry['call_type'] = entry_value['call_type']
                new_entry['call_start'] = entry_value['call_start']

                // Determining call length from basic subtraction
                let date_start = new Date(entry_value['call_start'])
                let date_end = new Date(entry_value['call_end'])
                let date_diff = Math.floor((date_end - date_start) / 1000);

                // We have the value in seconds, lets convert it into a string value indicative of the actual length
                let hours = 0;
                let minutes = 0;
                let seconds = 0;

                // Getting hours
                hours = Math.floor(date_diff / 3600);
                date_diff = date_diff - (hours * 3600);

                minutes = Math.floor(date_diff / 60);
                date_diff = date_diff - (minutes * 60);

                seconds = date_diff;

                if (hours < 10) 
                    hours = "0" + hours
                if (minutes < 10)
                    minutes = "0" + minutes
                if (seconds < 10)
                    seconds = "0" + seconds

                new_entry['call_time_display'] = hours + ":" + minutes + ":" + seconds
                new_entry['call_inbound_number'] = displayPhoneFriendly(entry_value['call_inbound_number']);
                new_entry['call_target_number'] = displayPhoneFriendly(entry_value['call_target_number']);
                new_entry['client_id'] = 30254;
                new_entry['client_name'] = "Maria Smith";

                output.push(new_entry);
            }

            console.log("OUTPUT");
            console.log(output);
            ref.setState({calls: output});
        });
    }

    render() {
        return (
            <div>
                <List 
                    header = {["ID", "Call Type", "Date", "Time", "From", "To", "Client ID", "Client Name"]}
                    header_reference = {header_reference}

                    listHeaderClassName = "listFull"
                    className = "client_call_list"
                    data = {this.state.calls}
                    width = {[40, 140, 200, 70, 150, 150, 100, 150]}

                    search_text_filter = {this.props.search_text_filter}
                />
            </div>
        )
    }
}