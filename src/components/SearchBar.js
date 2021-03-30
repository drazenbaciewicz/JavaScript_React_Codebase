// Wrapper class for a search functionality; need to have the adjustment functions within the class thats using it not the searchbar class itself

// Importing React
import React from 'react';

// Importing Material UI stuff
import TextField from '@material-ui/core/TextField';

// Importing the css
import "../css/Dashboard/SearchBar.css"

export default class SearchBar extends React.Component {

    constructor(props) {
        super(props);

        this.onTextfieldChange = this.onTextfieldChange.bind(this);
    }

    onTextfieldChange(e) {
        let value = e.target.value;

        if (this.props.onTextfieldChange !== null && this.props.onTextfieldChange !== undefined) {
            this.props.onTextfieldChange(value);
        }
    }

    render() {
        return (
            <div className = "searchbar_inner_container">
                <TextField 
                    underlineStyle={{display: 'none'}}
                    variant="outlined"
                    classname = "searchbar_textfield"
                    placeholder = "Search..."
                    onChange = {(e) => {this.onTextfieldChange(e)}}
                />
            </div>
        )
    }
}