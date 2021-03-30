import * as React from "react";
import {Table, Form, Checkbox, Loader, Accordion} from "semantic-ui-react";

export default class CandidatesTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }

    componentDidMount = async () => {
        const response = await fetch(`${window.REACT_APP_API_URL}/candidate/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });

        if (response.ok) {
            const json_response = await response.json();
            this.setState({data: json_response.data})
        }
    };

    render() {
        const {data} = this.state;

        if (data.length === 0) {
            return <Loader active inline='centered'/>
        }

        const rows = data.map((record) =>
            <Table.Row>
                <Table.Cell>
                    <Form.Field
                        control={Checkbox}
                    />
                </Table.Cell>
                <Table.Cell>{record.first_name}</Table.Cell>
                <Table.Cell>{record.last_name}</Table.Cell>
                <Table.Cell>{record.status}</Table.Cell>
                <Table.Cell>{record.inserted_on}</Table.Cell>
            </Table.Row>
        );

        return (
            <Table singleLine>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>
                            <Form.Field
                                control={Checkbox}
                            />
                        </Table.HeaderCell>
                        <Table.HeaderCell>First Name</Table.HeaderCell>
                        <Table.HeaderCell>Last Name</Table.HeaderCell>
                        <Table.HeaderCell>Status</Table.HeaderCell>
                        <Table.HeaderCell>Date Created</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Accordion
                    fluid={true}
                    as={Table.Body}
                    panels={data.map(n => {
                        return {
                            key: n.id,
                            class: "tr",
                            title: {
                                as: Table.Row,
                                className: "",
                                children: [
                                    <Table.Cell>
                                        <Form.Field
                                            control={Checkbox}
                                        />
                                    </Table.Cell>,
                                    <Table.Cell>{n.first_name}</Table.Cell>,
                                    <Table.Cell>{n.last_name}</Table.Cell>,
                                    <Table.Cell>{n.status}</Table.Cell>,
                                    <Table.Cell>{n.inserted_on}</Table.Cell>
                                ]
                            },
                            content: {
                                children: JSON.stringify(n.properties)
                            }
                        };
                    })}
                />
            </Table>)
    }
}