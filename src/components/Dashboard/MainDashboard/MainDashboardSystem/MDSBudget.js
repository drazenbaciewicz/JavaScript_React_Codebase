// Importing base react
import React from 'react';

// Importing local components
import DropButton from "../../../DropButton";

// Importing the CSS
import "../../../../css/Dashboard/MainDashboardSystem/MDSMain.css";
import "../../../../css/Dashboard/MainDashboardSystem/MDSBudget.css";

export default class MDSBudget extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            display: {
                'mds_budget_expense': 0,
                'mds_budget_income': 0
            }
        }   
    }

    onDropClick(index, value) {
        let new_display = this.state['display'];
        new_display[index] = value;
        this.setState({display: new_display});
    }

    render() {

        // Variable mapping
        let monthly_income_total = 0;
        let annual_income_total = 0;
        let monthly_expense_total = 0;

        if (this.props.data !== undefined && this.props.data['budget'] !== undefined) {
            monthly_income_total = this.props.data['budget']['monthly_income_total'];
            annual_income_total = 12*monthly_income_total;
            monthly_expense_total = this.props.data['budget']['monthly_expense_total'];
        }

        return (
            <div className = "primary_mds_holder">
                <div className = "mdsa_top_holder">
                    <div className = "mdsa_lead">{this.props.data['lead_first_name'] + " " + this.props.data['lead_last_name']}</div>
                </div>

                <div className = "mds_budget_top">
                    <div className = "mds_budget_top_monthly_income">Total Monthly Income: ${monthly_income_total}</div>
                    <div className = "mds_budget_top_monthly_income">Total Annual Income: ${annual_income_total}</div>
                    <div className = "mds_budget_top_monthly_income">Total Monthly Expense: ${monthly_expense_total}</div>
                </div>


                <div className = "mds_budget_left">
                    <DropButton 
                        title = "Income & Employment"
                        display = {this.state.display['mds_budget_income']}
                        onClick = {() => {this.onDropClick("mds_budget_income",!this.state.display['mds_budget_income'])}}
                    />
                    {this.state.display['mds_budget_income'] === true && <MDSBudgetIncome data = {this.props.data} credentials = {this.props.credentials} />}
                </div>
                
                <div className = "mds_budget_right">
                    <DropButton 
                        title = "Monthly Expenses"
                        display = {this.state.display['mds_budget_expense']}
                        onClick = {() => {this.onDropClick("mds_budget_expense",!this.state.display['mds_budget_expense'])}}
                    />
                    {this.state.display['mds_budget_expense'] === true && <MDSBudgetExpense data = {this.props.data} credentials = {this.props.credentials} />}
                </div>
            </div>
        )
    }
}

class MDSBudgetIncome extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className = "mds_budget_holder">
                <div className = "mds_budget_title">Income & Employment</div>
            </div>
        )
    }
}

class MDSBudgetExpense extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className = "mds_budget_holder">
                <div className = "mds_budget_title">Expense</div>
            </div>
        )
    }
}