import { Table } from 'semantic-ui-react';
import React from 'react';

class Candidates extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    }
  }

  componentWillMount = async () => {
    const response = await fetch(`${window.REACT_APP_API_URL}/candidate/imports`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });

    if (response.ok) {
      const json_response = await response.json();
      this.setState({ data: json_response.data })
    }
  };

  render() {
    const { data } = this.state;
    console.log(data)

    const rows = data.map((record) =>
      <Table.Row>
        <Table.Cell>{ record.id }</Table.Cell>
        <Table.Cell>{ record.file }</Table.Cell>
        <Table.Cell>{ record.status }</Table.Cell>
        <Table.Cell>{ record.inserted_on }</Table.Cell>
        <Table.Cell>{ record.updated_on }</Table.Cell>
      </Table.Row>
    );

    return (
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>ID</Table.HeaderCell>
            <Table.HeaderCell>File</Table.HeaderCell>
            <Table.HeaderCell>Status</Table.HeaderCell>
            <Table.HeaderCell>Uploaded On</Table.HeaderCell>
            <Table.HeaderCell>Last Updated</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          { rows }
        </Table.Body>
      </Table>
    )
  }
}

export default Candidates
