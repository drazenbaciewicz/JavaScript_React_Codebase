// Importing base react
import React from 'react';

// Material UI
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

// Importing the CSS
import "../../../../css/Dashboard/MainDashboardSystem/MDSMain.css";
import "../../../../css/Dashboard/MainDashboardSystem/MDSApplication.css";

// Importing local components
import DropButton from "../../../DropButton";

export default class MDSApplication extends React.Component {
    constructor(props) {
        super(props);

        // Managing which ones are open
        this.state = {
            display: {
                mds_info_self_display: 0,
                mds_work_self_display: 0,
                mds_info_co_display: 0,
                mds_work_co_display: 0
            }
        }
    }

    onDropClick(index, value) {
        let new_display = this.state['display'];
        new_display[index] = value;
        this.setState({display: new_display});
    }

    render() {
        // Building our components
        let mds_info_self = 
        <MDSAppInfo

        />

        return (
            <div className = "primary_mds_holder">
                <div className = "mdsa_top_holder">
                    <div className = "mdsa_lead">{this.props.data['lead_first_name'] + " " + this.props.data['lead_last_name']}</div>
                </div>

                <DropButton 
                    title = "Tell Us About Yourself"
                    display = {this.state.display['mds_info_self_display']}
                    onClick = {() => {this.onDropClick("mds_info_self_display",!this.state.display['mds_info_self_display'])}}
                />
                {this.state.display['mds_info_self_display'] === true && <MDSAppInfo data = {this.props.data} credentials = {this.props.credentials} />}
                <DropButton 
                    title = " Tell Us About Your Work And Finances"
                    display = {this.state.display['mds_work_self_display']}
                    onClick = {() => {this.onDropClick("mds_work_self_display",!this.state.display['mds_work_self_display'])}}
                />
                {this.state.display['mds_work_self_display'] === true && <MDSAppInfo data = {this.props.data} credentials = {this.props.credentials} />}
                <DropButton 
                    title = "Tell Us About Yourself - Co Borrower (Optional)"
                    display = {this.state.display['mds_info_co_display']}
                    onClick = {() => {this.onDropClick("mds_info_co_display",!this.state.display['mds_info_co_display'])}}
                />
                {this.state.display['mds_info_co_display'] === true && <MDSAppInfo data = {this.props.data} credentials = {this.props.credentials} />}
                <DropButton 
                    title = "Tell Us About Your Work And Finances - Co Borrower (Optional)"
                    display = {this.state.display['mds_work_co_display']}
                    onClick = {() => {this.onDropClick("mds_work_co_display",!this.state.display['mds_work_co_display'])}}
                />
                {this.state.display['mds_work_co_display'] === true && <MDSAppInfo data = {this.props.data} credentials = {this.props.credentials} />}
                <DropButton 
                    title = "All Notes"
                />

                <br />
                <br />
                <br />
            </div>
        )
    }
}

// Components for the actual display
class MDSAppInfo extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        // We have five containers, each container has a general set of information
        // We also have three rows

        return (
            <div className = "mds_info_holder">
                <div className = "mds_info_row_one">
                    <div className = "mds_info_row_one_one">

                        <div className = "mds_info_row_one_one_one">

                            <FormControl component="fieldset" className = "mds_info_ardio_language">
                                <FormLabel component="legend">Preferred Language</FormLabel>
                                <RadioGroup
                                    aria-label="language"
                                    name="language"
                                >
                                    <FormControlLabel  value="english" control={<Radio className = "mds_language_preference"/>} label="English" />
                                    <FormControlLabel  value="spanish" control={<Radio className = "mds_language_preference"/>} label="Spanish" />
                                </RadioGroup>
                            </FormControl>

                            <TextField
                                color="primary"
                                label="First Name"
                                className = "mds_info_text_input"
                                style = {{width: 150}}
                            />
                            
                            <TextField
                                color="primary"
                                label="Last Name"
                                className = "mds_info_text_input"
                                style = {{width: 150}}
                            />

                            <TextField
                                color="primary"
                                label="MI"
                                className = "mds_info_text_input"
                                style = {{width: 80}}
                            />          
                        </div>
                        <div className = "mds_info_row_one_one_two">
                            <TextField
                                color="primary"
                                label="Client ID #"
                                className = "mds_info_text_input"
                                style = {{width: 150}}
                            />
                            <TextField
                                id="date"
                                label="DOB"
                                type="date"
                                InputLabelProps={{
                                shrink: true,
                                }}
                                
                                className = "mds_info_text_input"
                            />
                            <TextField
                                color="primary"
                                label="SSN"
                                className = "mds_info_text_input"
                                style = {{width: 250}}
                            />
                        </div>
                    
                    </div>
                    <div className = "mds_info_row_one_two">
                        <FormControl component="fieldset" className = "mds_info_ardio_language">
                            <FormLabel component="legend">Preferred Contact</FormLabel>
                            <RadioGroup
                                aria-label="contact"
                                name="contact"
                            >
                                <FormControlLabel value="cell" control={<Radio />} label="Cell" />
                                <TextField 
                                    color="primary"
                                    className = "mds_info_text_input_radio"
                                    style = {{width: 150}}
                                />
                                <FormControlLabel value="work" control={<Radio />} label="Work" />
                                <TextField 
                                    color="primary"
                                    className = "mds_info_text_input_radio"
                                    style = {{width: 150}}
                                />
                                <FormControlLabel value="home" control={<Radio />} label="Home" />
                                <TextField 
                                    color="primary"
                                    className = "mds_info_text_input_radio"
                                    style = {{width: 150}}
                                />
                            </RadioGroup>
                        </FormControl>
                    </div>
                </div>
                <div className = "mds_info_row_two">
                    <div className = "mds_info_row_two_one">
                    
                    </div>
                </div>
                <div className = "mds_info_row_three">
                    <div className = "mds_info_row_three_one">
                    
                    </div>
                    <div className = "mds_info_row_three_two">
                    
                    </div>
                </div>
            </div>
        )
    }
}