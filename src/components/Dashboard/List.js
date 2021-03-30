// Importing base react
import React from 'react';

// Importing the CSS
import "../../css/Dashboard/List.css";

// Importing elements
import Checkbox from '@material-ui/core/Checkbox';

// Custom list element that does list stuff for us
export default class List extends React.Component {

    constructor(props) {
        super(props);

        this.placeholderRowClick = this.placeholderRowClick.bind(this);
    }

    // Temporary placeholder
    placeholderRowClick() {
        console.log("Row click");
    }
    
    render() {

        // Making rendering decisions about the list data
        let display_list = []

        // Width list tells us the minimum width value for certain entries
        // This enforces width which is important for us...
        let width_list = [150, 150, 150, 150, 150, 150];

        if (this.props.width != null) {
            width_list = this.props.width
        }

        let rowClickFunction = this.placeholderRowClick;
        if (this.props.onRowClick !== null && this.props.onRowClick !== undefined) {
            rowClickFunction = this.props.onRowClick;
        }

        // Not rendering data if our list data is too small
        console.log(this.props.data);
        if (this.props.data !== undefined && this.props.data !== null && this.props.data.length > 0) {
            // Failure, missing elements

            for (let i = 0; i < this.props.data.length; i++) {
                let is_checked = false;
                if (this.props.checked_data != undefined && i in this.props.checked_data) {
                    is_checked = this.props.checked_data[i];
                }

                // Searching through each data, checking if our datapoint exists anywhere!
                if (this.props.search_text_filter !== null && this.props.search_text_filter !== undefined && this.props.search_text_filter.length > 1) {
                    let flag = false;
                    // Iterating on all data elements
                    for (let entry_id in this.props.data[i]) {
                        let entry_text = this.props.data[i][entry_id].toString().toLowerCase();
                        if (entry_text.includes(this.props.search_text_filter.toLowerCase())) {
                            flag = true;
                            break;
                        }
                    }

                    if (!flag) {
                        continue;
                    }
                }

                let new_display = 
                <ListElement 
                    onRowClick = {rowClickFunction} 
                    checked = {is_checked} 
                    key = {i} 
                    index = {i} 
                    handleCheck = {this.props.handleCheck} 
                    data = {this.props.data[i]} 
                    width_list = {width_list}
                    header_reference = {this.props.header_reference}
                    listDisplayType={this.props.listDisplayType}
                />

                display_list.push(new_display);
            }
        }
        
        return (
            <div className = {"list_main_holder " + this.props.className } style = {this.props.style}>
                
                
                <div className = "list_header_holder" style = {this.props.headerStyle}>
                    <ListHeader handleCheckAll = {this.props.handleCheckAll} className = {this.props.listHeaderClassName} header = {this.props.header} width_list = {width_list}/>
                </div>

                <div className = {"list_display_holder " + this.props.listDisplayHolderClassName}>
                    {display_list}
                </div>  
            </div>
        )
    }
}

// Header row element
class ListHeaderRow extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className = "list_header_row" style = {{minWidth: this.props.width, width: this.props.width, maxWidth: this.props.width}}>
                {this.props.text}
                <i className = "fa fa-arrow-up header_row_icon_up"></i>
                <i className = "fa fa-arrow-down header_row_icon_down"></i>
            </div>
        )
    }
}

// Custom list header
class ListHeader extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        // Building the header list objects
        let header_list = [];

        if (this.props.showCheckAll)
            header_list.push(<Checkbox onChange = {() => {this.props.handleCheckAll()}} className = "list_header_checkbox" checked = {this.props.checked}/>);
        else
            header_list.push(<div className = "list_header_checkbox_empty" />)

        for (let entry in this.props.header) {
            let entry_text = this.props.header[entry];

            let header_entry = <ListHeaderRow text = {entry_text} width = {this.props.width_list[entry]}/>;
            header_list.push(header_entry);
        }
        return (
            <div className = {"list_header " + this.props.className}>
                {header_list}
            </div>
        )
    }
}

// Custom list element
class ListElement extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render() {

        // Building the list elements
        let element_list = [];

        // Determining which type we are
        element_list.push(<Checkbox onChange = {() => {this.props.handleCheck(this.props.index, this.props.data)}} className = "list_header_checkbox" checked = {this.props.checked}/>);

        if (this.props.listDisplayType !== null && this.props.listDisplayType !== undefined && this.props.listDisplayType === "list") {
            for (let entry in this.props.data) {
                let entry_text = this.props.data[entry];

                let new_element = <ListElementRow text = {entry_text} key = {entry} width = {this.props.width_list[entry]}/>
                element_list.push(new_element);
            }
        }
        else {
            // Using the old format...
            for (let header in this.props.header_reference) {
                let header_text = this.props.header_reference[header];
                let entry_text = this.props.data[header_text];

                let new_element = <ListElementRow text = {entry_text} key = {header} width = {this.props.width_list[header]}/>
                element_list.push(new_element);
            }
        }

        return (
            <div className = "list_element_holder" onClick = {() => {this.props.onRowClick(this.props.index, this.props.data)}}>
                {element_list}
            </div>
        )
    }
}

// List element row item
class ListElementRow extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className = "list_element_row" style = {{minWidth: this.props.width, width: this.props.width, maxWidth: this.props.width}}>
                {this.props.text}
            </div>
        )
    }
}