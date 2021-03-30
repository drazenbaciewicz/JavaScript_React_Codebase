// Importing React
import React from 'react';

// Loading the Material UI
import Button from "@material-ui/core/Button";

// Loading CSS
import "../../../css/Dashboard/EmailSidebar.css";

export default class EmailSidebar extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className = "email_sidebar_holder">
                <div className = "email_sidebar_compose_holder">
                    <Button
                        className = "email_sidebar_compose_button"
                        variant="contained"
                        color="primary"
                    >
                        Compose
                    </Button>
                </div>

                <div className = "email_sidebar_select_holder">
                    <div className = "email_sidebar_select_row" color = "primary">
                        Inbox
                    </div>
                    <div className = "email_sidebar_select_row">
                        Sent
                    </div>
                    <div className = "email_sidebar_select_row">
                        Drafts
                    </div>
                    <div className = "email_sidebar_select_row">
                        Trash
                    </div>
                    <div className = "email_sidebar_select_row_templates">
                        Templates
                    </div>
                </div>
            </div>
        )
    }
}