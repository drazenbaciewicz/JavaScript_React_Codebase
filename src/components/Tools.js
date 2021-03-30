import { timeout } from "q";

export function displayPhoneFriendly(phone) {
    // Given a phone number (including global extension) dividng it up the proper way
    // Converting to string
    phone = phone + "";

    let lastFour = phone.substring(phone.length - 4)
    let lastThree = phone.substring(phone.length - 7, phone.length - 4)
    let extension = phone.substring(phone.length - 10, phone.length - 7)
    let global = phone.substring(0, phone.length - 10)

    return "+" + global + " (" + extension + ") " + lastThree + "-" + lastFour;
}

// Function for displaying times in a friendly way
export function getDisplayTime(utcDate) {
    // Setting up variables
    let time_var = "AM";

    // Getting the hour time first
    let hour = utcDate.getHours();
    if (hour > 12) {
        hour = hour - 12;
        time_var = "PM";
    }

    // Okay dealing with the minutes...
    let minute = utcDate.getMinutes();
    // Adding 0 to front if we need to 
    if (minute < 10) {
        minute = "0" + minute;
    };

    return hour + ":" + minute + " " + time_var;
}

// Constant arrays for healping...
let month_array_long = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
let month_array_short = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];


export function utcToLocal(datestring) {

    if (datestring === null || datestring === undefined || datestring.length <= 0) {
        return "N/A";
    }

    // First we construct a date in local timezone (note that we are not actually in local timezone)
    let date = new Date(datestring);

    // Then we will get the important bits out, and build it into a UTC date...
    let utcDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds()));

    // Our UTC date is the correct date...
    // Now to return it...
    let output = month_array_long[utcDate.getMonth()] + " " + utcDate.getDate() + " at " + getDisplayTime(utcDate);
    

    return output;
}