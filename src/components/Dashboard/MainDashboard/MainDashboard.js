// This is a template for creating new reactJS files

// Importing React
import React from 'react';

// Material UI
import SearchBar from "../../SearchBar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

// Importing base CSS
import "../../../css/Dashboard/Dashboard.css"
import "../../../css/Dashboard/MainDashboard.css"

// Importing the MDS
import MDSMain from "./MainDashboardSystem/MDSMain.js";

// Importing the list
import List from "../List"

// Header reference datapoints
const header_reference = ["lead_id", "lead_status", "lead_first_name","lead_middile_initial", "lead_last_name", "lead_est_debt", "lead_city", "lead_state"];

export default class MainDashboard extends React.Component {
    constructor(props) {
        super(props);

        // Lead data is an array object that contains all of the leads
        // Lead indexed data is a hashtable with the ID of the lead as the key and the data as the object
        this.state ={
            lead_data: [],
            lead_indexed_data: {},

            row_select_data: {},
            row_select_index: -1,

            user_info: null,

            load_lead_direct_status: "No Status",
            load_lead_direct_id: ""
        }

        this.modifyUserData = this.modifyUserData.bind(this);
        this.loadLeadData = this.loadLeadData.bind(this);
        this.onTextfieldChange = this.onTextfieldChange.bind(this);
        this.onRowClick = this.onRowClick.bind(this);
    }
    
    componentDidMount() {
        this.loadLeadData();
    }

    onTextfieldChange(value) {
        this.setState({search_text_filter: value});
    }

    loadLeadDirect() {
        // Attempting to load a lead directly from the system...
        // Loading the lead data
        let ref = this;

        // Creating the data
        let data = {
            "employee_auth": this.props.credentials['employee_auth'],
            "employee_id": this.props.credentials['employee_id']
        };
        data['lead_id'] = this.state.load_lead_direct_id;

        // Getting messages
        console.log("Loading direct lead");

        fetch('http://159.65.71.123:5000/lead/load_id', {
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

    loadLeadData() {
        // Loading the lead data
        let ref = this;

        // Creating the data
        let data = {
            "employee_auth": this.props.credentials['employee_auth'],
            "employee_id": this.props.credentials['employee_id']
        };
        data['type'] = "all";

        // Getting messages
        console.log("Getting all leads!");

        fetch('http://159.65.71.123:5000/lead/get', {
            method: 'post',
            body: JSON.stringify(data)
        })
            .then(function(response) {
            return response.json();
        })
        .then(function(myJson) {
            console.log(myJson);
            let output = myJson['output'];

            // Format fixing in all entries
            for (let i = 0; i < output.length; i++) {
                let debt_value = parseInt(output[i]['lead_est_debt']);
                debt_value = debt_value.toLocaleString('en');
                output[i]['lead_est_debt'] = "$" + debt_value;
            }
            console.log(output);
            ref.setState({lead_data: output});
        });
    }

    onRowClick(index, data) {
        console.log("Clicked at index of " + index + " with following data");
        console.log(data);

        // Checking if we want to 'close' the display...
        if (index === this.state.row_select_index) {
            // Okay we are closing it!
            this.setState({row_select_data: null, row_select_index: -1});
            return;
        }

        this.setState({row_select_data: data, row_select_index: index});
    }

    // Function for general modification of user data
    modifyUserData(value, index) {
        let new_user_info = this.state.row_select_data;
        new_user_info[index] = value;
        this.setState({row_select_data: new_user_info});
    }

    render() {

        // Building the main dashboard system
        // Only displaying if our data is not null
        
        // Determining if we will be displaying the short or tall list
        let list_holder_class = "md_list_normal";
        
        let mds_main = null;
        console.log("DATA");
        console.log(this.state.row_select_data);
        if (this.state.row_select_data !== null && this.state.row_select_data !== undefined && Object.keys(this.state.row_select_data).length > 0) {
            console.log("Enabling MDSMain");

            mds_main = 
            <MDSMain 
                data = {this.state.row_select_data}
                user_info = {this.state.user_info}
                modifyUserData = {this.modifyUserData}
            />;
            list_holder_class = "md_list_small";
        }

        return (
            <div className = "primary_container">
                <div className = "dashboard_title_holder">
                    Client Leads
                </div>

                <div className = "searchbar_holder">
                    <SearchBar 
                        onTextfieldChange = {this.onTextfieldChange}
                    />
                </div>

                <br/>
                <br/>
                <br/>
                
                <div className = "dashboard_upper_holder">
                    <TextField 
                        value = {this.state.load_lead_direct_id}
                        onChange = {(e) => {this.setState({load_lead_direct_id: e.target.value})}}
                        className = "dashboard_id_input_textfield"
                    />
                    <Button
                        className = "dashboard_id_input_button"
                        variant="contained"
                        color="primary"
                        onClick = {() => {this.loadLeadDirect()}}
                    >
                        Load from ID
                    </Button>
                </div>

                <div className = "list_holder">
                    <List 
                        header = {["ID", "Status", "First Name", "MI", "Last Name", "Debt", "City", "State"]}
                        header_reference = {header_reference}
                        className = {list_holder_class}
                        color = "primary"
                        listHeaderClassName = "listFull"
                        width = {[30, 140, 140, 30, 140, 80, 150, 80]}
                        data = {this.state.lead_data}
                        onRowClick = {this.onRowClick}
                        color = "primary"
                        search_text_filter = {this.state.search_text_filter}
                    />

                    {mds_main}
                </div>
            </div>
        )
    }
}