// Importing React
import React from 'react';

// Importing base CSS
import "../../../css/Dashboard/EmployeeChatMemberBox.css"

export default class EmployeeChatMemberBox extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        // Checking if we even have a chat member list
        if (this.props.member_list == null) {
            return (
                <div />
            )
        }

        // Building the member list div
        let member_list = [];

        for (let entry in this.props.member_list) {
            let employee_name = this.props.member_list[entry]['employee_name'];
            let employee_title = this.props.member_list[entry]['employee_title'];
            console.log(employee_name);


            // Building the entry
            let entry_div = 
            <div className = "employee_list_entry">
                <img className = "employee_profile_image" src = {require("../../../assets//img/profile_circle.png")} />
                <div className = "employee_list_name">{employee_name}</div>
                <div className = "employee_list_title">{employee_title}</div>
            </div>

            // Appending
            member_list.push(entry_div);
        }

        return (
            <div className = "employeeChatMemberHolder">
                <div className = "employeeChatMemberTitle">
                    Chat Members
                </div>

                {member_list}
            </div>
        )
    }
}
