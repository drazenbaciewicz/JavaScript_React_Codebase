// File for displaying all of the client communications with SMS

// Importing React
import React from 'react';

// Importing material-ui

// Importing CSS
import "../../../css/Dashboard/Dashboard.css"
import "../../../css/Dashboard/ClientCommunication.css"

// Importing external components
import List from "../List"

// Header reference
const header_reference = [""];

export default class ClientCommunicationSMS extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            sms: [[153, "April 20th 2019", "18586686091", "18585364147", "Alexander Weber", "John Weber", "Click to view message"]]
        }
    }

    render() {
        return (
            <div>
                <List 
                    header = {["ID", "Date", "From", "To", "Employee", "Client", "Message"]}
                    listHeaderClassName = "listFull"
                    className = "client_call_list"
                    data = {this.state.sms}
                    width = {[40, 150, 100, 100, 200, 200, 200]}
                />
            </div>
        )
    }
}