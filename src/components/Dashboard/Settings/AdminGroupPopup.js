import React from 'react';

// CSS
import "../../../css/Dashboard/AdminGroupPopup.css"

// Loading the normal Material UI
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

// Components
import PermissionListSelect from "./PermissionListSelect";

export default class AdminGroupPopup extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            new_permission_select: {},
            group_name: ""
        };

        this.onPermissionCheck = this.onPermissionCheck.bind(this);
        this.onChangeText = this.onChangeText.bind(this);
    }

    onPermissionCheck(type, value) {
        let update_permission_select = this.state.new_permission_select;
        update_permission_select[type] = value;

        this.setState({new_permission_select: update_permission_select});
    }

    onChangeText(text) {
        this.setState({group_name: text.target.value});
    }

    render() {

        if (this.props.permission_default === undefined) {
            return (
                <div />
            )
        }

        return (
            <div className = "create_group_container">
                <div className = "create_group_title" color="primary">Create Group</div>
                <TextField onChange = {(e,v) => {this.onChangeText(e)}} className = "new_group_text_field" value = {this.state.group_name} placeholder = "Group Name"/>

                <div className = "permission_list_select_holder_popup">
                    <PermissionListSelect display_permission = {this.state.new_permission_select} permission_list = {this.props.permission_default} onPermissionCheck = {this.onPermissionCheck}/>
                </div>

                <div className = "button_popup_group_holder">
                    <Button
                        onClick = {() => {this.props.saveGroup(this.state.group_name, this.state.new_permission_select)}}
                        variant="contained"
                        color="primary"
                        className="save_group_button"   
                        disabled = {this.state.group_name.length <= 0}
                        
                    >
                        Save
                    </Button>

                    <Button
                        onClick = {() => {this.props.close(false, "")}}
                        variant="contained"
                        color="primary"
                        className="close_group_button"
                        
                    >
                        Close
                    </Button>
                </div>
            </div>
        );
    }
}