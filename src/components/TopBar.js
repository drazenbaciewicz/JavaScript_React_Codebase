/* Topbar that allows us to build a simple tab bar thingy I guess */

// Importing React
import React from 'react';

// Importing base CSS
import "../css/TopBar.css"

class TopBarTab extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        let class_name = "topbar_tab_holder";
        let active_color = "#9EA0A5";
        let icon_class = "";
        let text_class = "topbar_text inactive_topbar";

        if (this.props.active) {
            // Appending the active class
            active_color = "#27486E";
            class_name = class_name + " active_topbar_tab"
            text_class = "topbar_text active_topbar"
        }

        if (this.props.icon !== undefined && this.props.icon !== null) {
            icon_class = "fa fa-" + this.props.icon;
        }

        return (
            <div className = {class_name} onClick = {() => {this.props.onChange(this.props.tab_title)}}>
                <div className = {icon_class} style = {{float: "left", textAlign: "right", marginTop: 0, width: 50, fontSize: 24, marginRight: 0, color: active_color}} />
                <div className = {text_class}>{this.props.tab_title}</div>
            </div>
        )
    }
}

export default class TopBar extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        // Building the tab bars...
        let tab_bar_list = []
        for (let entry in this.props.tabs) {
            let entry_value = this.props.tabs[entry];
            let icon = null;
            if (this.props.icons !== undefined && this.props.icons !== null)
                icon = this.props.icons[entry];

            let active_value = false;

            //console.log(this.props.value+","+entry_value);
            if (this.props.value === entry_value) {
                active_value = true;
            }

            let temp_tabbar = <TopBarTab icon = {icon} onChange = {this.props.onChange} tab_title = {entry_value} active = {active_value} />;
            tab_bar_list.push(temp_tabbar);
        }

        return (
            <div className = "topbar_holder">
                {tab_bar_list}
            </div>
        )
    }
}