// Importing the Popups
import Popup from 'reactjs-popup';

// Importing base CSS
import "../../../css/Dashboard/NotifyPopup.css"

// Importing React
import React from 'react';

export default class NotifyPopup extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = {
            data: null
        }
    }

    // Moving data from props into state
    componentDidMount() {
        this.setState({data: this.props.data});
    }

    // Function for updating a view...
    viewNotify(entry_id, notify_id) {
        console.log("Updating the notification for this notification");

        let data_info = this.state.data;
        delete data_info[entry_id];

        this.setState({data: data_info});

        // Creating the message
        let data = {
            "employee_auth": this.props.credentials['employee_auth'],
            "employee_id": this.props.credentials['employee_id']
        };
        data['notify_id'] = notify_id;

        fetch('http://159.65.71.123:5000/notify/view', {
            method: 'post',
            body: JSON.stringify(data)
        })
            .then(function(response) {
            return response.json();
        })
        .then(function(myJson) {
            console.log(myJson);

        });
    }

    render() {

        if (this.state.data == null) {
            return <div />
        }

        console.log(this.props.data);

        // Building the notification list from our notification data
        let notification_output_data = [];

        for (let entry_id in this.state.data) {
            let entry = this.props.data[entry_id];

            console.log(entry);
            let temp_entry_div = 

            <div className = "notify_popup_div not_seen_notify">
                    <div className = "notify_popup_header">{entry['notify_message']}</div>
                    <div className = "notify_popup_date">At {entry['notify_date']}</div>
                    <div className = "notify_popup_view">
                    <i  color = "primary" className="fa fa-eye view_icon" onClick = {() => {this.viewNotify(entry_id, entry['notify_id'])}} /> &nbsp; Hide
                </div> 
            </div>

            notification_output_data.push(temp_entry_div);
        }

        return (
            <div className = "chat_popup_holder">

                <div className = "chat_popup_body">
                    <div className = "popup_title" color = "primary">New Notifications</div>
                </div>

                <div className = "notify_popup_list_holder">
                    {notification_output_data}
                </div>
            </div>
        )
    }
}