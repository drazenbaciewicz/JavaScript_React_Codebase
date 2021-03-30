// This is a template for creating new reactJS files

// Importing React
import React from 'react';
import { Container, Header, Icon, Label, Menu, Table, Tab } from 'semantic-ui-react'

// Importing base CSS
import '../../../css/Dashboard/Dashboard.css'
import '../../../css/Dashboard/Data.css'
import CandidatesTable from './Candidates';

export default class Data extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const panes = [
      {
        menuItem: 'Campaigns',
        render: () => <Tab.Pane attached={ false }>View Campaign Data Here!</Tab.Pane>,
      },
      {
        menuItem: 'Candidates',
        render: () => <Tab.Pane attached={ false }><CandidatesTable /></Tab.Pane>,
      }
    ];

    return (
      <Container>
        <Header as='h2'>
          <Icon name='database' />
          <Header.Content>
            Candidates Data
            <Header.Subheader>Manage Campaigns</Header.Subheader>
          </Header.Content>
        </Header>
        <Tab menu={{ pointing: true }} panes={panes} />
      </Container>
    )
  }
}
