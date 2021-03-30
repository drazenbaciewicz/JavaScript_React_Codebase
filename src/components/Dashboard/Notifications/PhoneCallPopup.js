// This is a template for creating new reactJS files

// Importing React
import React from 'react';

// Importing functions from tools
import { displayPhoneFriendly } from "../../Tools";

// Importing the CSS
import "../../../css/Dashboard/PhoneCallPopup.css";

// Material UI
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

// Importing image
import inbound_call from '../../../assets/img/inbound_call.png';

export default class PhoneCallPopup extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            id_val: ""
        }
    }

    // Tiny helper function that checks the length of id_val
    // The length of our ID val should be EXACTLY a specific length
    checkDisableButton() {
        console.log(this.state.id_val);
        if (this.state.id_val.length < 5) {
            return true
        }

        return false;
    }

    handleInputID(event) {
        this.setState({id_val: event.target.value});
    }

    render() {
        console.log(this.props);
        return (
            <div className = "phonecall_pop_holder">

                <img src={inbound_call} className = "phonecall_img"/>
                
                <div className = "phonecall_recieve_text">
                    Inbound Caller
                </div>

                <div className = "phonecall_phone_number">
                    {displayPhoneFriendly(this.props.phone_data['number'])}
                </div>

                <div className = "input_id_holder">
                    <div className = "input_id_title">
                        Input caller prequal number
                    </div>

                    <TextField 
                        className = "input_id_input" 
                        placeholder = "Prequal Number" 
                        margin="normal"
                        variant="outlined"
                        inputProps={{
                            style: {fontSize: 22, textAlign: "center"} 
                        }}
                        value = {this.state.id_val}
                        onChange = {(v) => {this.handleInputID(v)}}
                    />
                </div>
                <Button
                    label = "Load Client"
                    disabled = {this.checkDisableButton()}
                    variant="contained"
                    color="primary"
                    className="input_id_button"
                >
                    Load Client
                </Button>
                <Button
                    label = "Hot Transfer"
                    variant="contained"
                    color="primary"
                    className="hot_transfer_button"
                >
                    Hot Transfer
                </Button>
            </div>
        )
    }
}