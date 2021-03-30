// Importing base react
import React from 'react';

// Material Ui
import Paper from '@material-ui/core/Paper';

// CSS
import "../css/DropButton.css"

export default class DropButton extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        
        return(
            <div className = "db_display_holder" onClick = {this.props.onClick}>
                <Paper elevation={10} className = "db_display_button" color="primary">
                    <div className = "db_display_button_text">{this.props.title}</div>
                    <i className = "fa fa-chevron-down db_display_button_icon"></i>
                </Paper>
            </div>
        )
    }
}