import * as React from "react";
import {Container, Header, Icon, Tab} from "semantic-ui-react";
import CandidatesTable from "./CandidateTable";

export default class CandidateDashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <Container>
                <Header as='h2'>
                    <Icon name='users'/>
                    <Header.Content>
                        Candidate Leads
                    </Header.Content>
                </Header>

                <CandidatesTable />

            </Container>
        )
    }
}