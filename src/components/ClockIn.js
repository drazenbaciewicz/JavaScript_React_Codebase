import logo_image from "../assets/img/logo.png";
import AlarmOn from "@material-ui/core/SvgIcon/SvgIcon";
import Button from "@material-ui/core/Button";
import React from "react";

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const months = ["January", "February", "March", "April", "May", "June", "July", "August",
    "September", "October", "November", "December"];

export const ClockIn = (props) => {
    const current_date = new Date();
    const current_day = days[current_date.getDay()];
    const current_month = months[current_date.getMonth()];
    const current_year = current_date.getFullYear();

    let minute = current_date.getMinutes();
    if (minute <= 0) {
        minute = "00";
    } else if (minute < 10) {
        minute = "0" + minute;
    }
    let hours = current_date.getHours();
    let flag = "AM";
    if (hours == 0) {
        hours = 12;
    }
    if (hours > 12) {
        hours = hours - 12;
        flag = "PM";
    }

    let current_time = hours + ":" + minute + " " + flag;
    let day_of_month = current_date.getDate();

    return (
        <div className="login_main_text">
            <img src={logo_image} alt="logo" className="logo_image"/>

            <div className="welcome_back_text">
                Welcome back {props.user['first_name']}!
            </div>
            <div className="employment_title">
                {props.user['title']}
            </div>
            <div className="current_date_value">
                {current_day}, {current_month} {day_of_month}, {current_year}
            </div>
            <div className="loading_current_time">
                {current_time} - TIME ZONE HERE
            </div>

            <AlarmOn className="clock_in_image" fontSize="large" color="primary"/>
            <Button
                variant="contained"
                color="action"
                className="clock_in_button"
                onClick={() => (props.clockIn())}
                color="primary"
            >
                Clock In
            </Button>
        </div>
    )
};