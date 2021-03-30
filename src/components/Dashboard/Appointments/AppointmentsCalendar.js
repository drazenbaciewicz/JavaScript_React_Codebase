// This is a template for creating new reactJS files

// Importing React
import React from 'react';

// Importing the calendar
//import "react-big-scheduler/lib/css/style.css"
import Scheduler, {SchedulerData, ViewTypes, DATE_FORMAT} from 'react-big-scheduler'
import Calendar from "react-big-calendar"
//import 'react-big-calendar/lib/sass/styles'
import moment from 'moment'
import "react-big-calendar/lib/css/react-big-calendar.css"

// Importing base CSS
import "../../../css/Dashboard/Dashboard.css"
import "../../../css/Dashboard/Appointments.css"

const localizer = Calendar.momentLocalizer(moment);

export default class AppointmentsCalendar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            events: [
              {
                start: new Date(),
                end: new Date(moment().add(1, "days")),
                title: "Some title",
                color: "#27486E"
              }
            ],
            sytles:[
                {
                    color: "#2fbaff"
                }
            ]
        }
    }

    // Function for when the view changes
    onViewChange() {
        
    }

    onSelectDate() {

    }

    componentDidMount() {
        console.log("Mounting appointment view");
        //this.setState({loaded: true});
    }

    render() {

        // Set up the display of the calendar events ....

        // Building the scheduler
        let calendar = 
        <Calendar
          localizer={localizer}
          defaultDate={new Date()}
          defaultView="month"
          events={this.state.events}
          style={{ position: "absolute", height: "70vh", width: "78vw", marginTop: "2vh", color: "#9EA0A5" }}
        />

        return (
            <div className = "calendar_container" >
                {calendar}
            </div>
        )
    }
}