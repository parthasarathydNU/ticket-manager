/**
 * Form component for the ticket creation page.
 * Author: Aravind Dasarathy
 * Date: 08/12/2022
 *
 * @module components/form
 * @requires react
 * @requires react-redux
 * @requires @material-ui/core
 * @requires @mui/material
 * @requires next
 * @requires next/router
 * @requires components/text-field
 * @requires components/autocomplete-field
 * @requires store/slice/appSlice
 */

import { Container, Divider, Typography, Button, Box } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { makeStyles } from '@material-ui/core/styles';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import HailTextField from './text-field.js';
import HailAutocompleteField from './autocomplete-field.js';
import { setCurrentView } from '../../store/slice/appSlice.js';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(5, 0)
  },
  vSpace: {
    margin: theme.spacing(2, 0)
  }
}));

/*
 * props should contain:
  * Array of customers/ticket requesters
  * Array of agents/ticket responders
  * The current logged in agent to populate it as a default value for the responder id.
  * Array of tags
*/
export default function FormData(props) {
  const {
    agent: responders,
    customer: requesters
  } = props.ticketResources;

  const loggedInResponder = props.loggedInAgent;

  const dispatch = useDispatch();

  useEffect(() =>{
    dispatch(setCurrentView("New Ticket"));
  }, []);

  // for now, using dummy data
  // const requesters = [
  //   { id: 1, name: 'Amira Halima' },
  //   { id: 2, name: 'Tyrik Lisa' },
  //   { id: 3, name: 'Nazzareno Edna' }
  // ];

  // const responders = [
  //   { id: 1, name: 'Eirenaios Aina' },
  //   { id: 2, name: 'Kizzy Walahfrid' },
  //   { id: 3, name: 'Secundinus Spurius' }
  // ];

  // const loggedInResponder = { id: 3, name: 'Secundinus Spurius' };

  const tags = ['tag1', 'tag2', 'tag3'];

  const [ ticketData, setTicketData ] = useState({
    subject: '',
    description: '',
    status: 'Open',
    priority: 'Low',
    requester_id: '',
    responder_id: loggedInResponder.id,
    tags: [],
  });

  const requesterObject = requesters.find((requester) => {
    return requester.id.toString() === ticketData.requester_id.toString();
  });

  const responderObject = responders.find((responder) => {
    return responder.id.toString() === ticketData.responder_id.toString();
  });

  const classes = useStyles();
  const Router = useRouter();

  const handleChange = (event) => {
    setTicketData({
      ...ticketData,
      [event.target.name]: event.target.value
    });
  };

  const saveTicket = (ticketData) => {
    return fetch('http://localhost:8080/ticket/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(ticketData)
    });
  };

  const handleSubmit = async (event) => {
    try {
      // TODO: display ticket created successful notification using notification service
      event.preventDefault();
      await saveTicket(ticketData);
      Router.push('/ticket-management');
    } catch (error) {
      // TODO: display error message using notification service
      console.log(error);
    }
  };

  return (
    <Container component="main" maxWidth="md" className={classes.root}>
      <Typography variant="h4" component="h2" align="center" gutterBottom>
        Create New Ticket
      </Typography>

      <Typography variant="body2" component="p" gutterBottom>
        Fields marked with * are required.
      </Typography>

      <Divider className={classes.vSpace} />

      <Typography variant="h5" component="h3" gutterBottom>
        Ticket Details
      </Typography>

      <form onSubmit={handleSubmit}>
        <HailTextField
          label="Subject"
          name="subject"
          value={ticketData.subject}
          onChange={handleChange}
        />

        <HailTextField
          label="Description"
          name="description"
          value={ticketData.description}
          onChange={handleChange}
          multiline
          rows={4}
        />

        <HailAutocompleteField
          options={['Open', 'In Progress', 'Resolved', 'Closed'] || []}
          value={ticketData.status}
          onChange={(event, newValue) => {
            handleChange({
              target: { name: 'status', value: newValue }
            });
          }}
          renderInput={(params) => (
            <HailTextField label="Status" name="status" {...params} />
          )}
        />

        <HailAutocompleteField
          options={['Low', 'Medium', 'High', 'Urgent'] || []}
          value={ticketData.priority}
          onChange={(event, newValue) => {
            handleChange({
              target: { name: 'priority', value: newValue }
            });
          }}
          renderInput={(params) => (
            <HailTextField label="Priority" name="priority" {...params} />
          )}
        />

        <HailAutocompleteField
          options={requesters || []}
          getOptionLabel={(option) => {
            return (typeof option == 'string')
              ? option
              : option.name;
          }}
          isOptionEqualToValue={(option, value) => option.name.toString() === value.toString()}
          value={requesterObject ? requesterObject.name : ''}
          onChange={(event, newValue) => {
            handleChange({
              target: { name: 'requester_id', value: newValue?.id || '' }
            });
          }}
          renderInput={(params) => (
            <HailTextField label="Requesters" name="requester" {...params} />
          )}
        />

        <HailAutocompleteField
          options={responders || []}
          getOptionLabel={(option) => {
            return (typeof option == 'string')
              ? option
              : option.name;
          }}
          isOptionEqualToValue={(option, value) => option.name.toString() === value.toString()}
          value={responderObject ? responderObject.name : ''}
          onChange={(event, newValue) => {
            handleChange({
              target: { name: 'responder_id', value: newValue?.id || '' }
            });
          }}
          renderInput={(params) => (
            <HailTextField label="Responders" name="responder" {...params} />
          )}
        />

        <HailAutocompleteField
          multiple
          options={tags || []}
          value={ticketData.tags}
          onChange={(event, newValue) => {
            handleChange({
              target: { name: 'tags', value: newValue }
            });
          }}
          renderInput={(params) => (
            <HailTextField
              label="Tags" name="tags" required={ticketData.tags.length === 0} {...params} />
          )}
        />

        <Divider className={classes.vSpace} />

        <Box mt={3}>
          <Link  scroll={false} href="/ticket-management">
            <Button variant="contained" color="primary" type="button" sx={{mr: 89}}>
              Go Back
            </Button>
          </Link>

          <Button variant="contained" color="primary" type="submit">
            Submit
          </Button>
        </Box>
      </form>
    </Container>
  )
};