/**
 * New Ticket Form page
 * Author: Aravind Dasarathy
 * Date: 08/12/2022
 *
 * @module pages/ticket-management/new
 * @requires components/form
 * @requires react-redux
 * @requires components/layout/layout
 */

import FormData from '../../components/form';
import { useSelector } from 'react-redux';
import Layout from '../../components/layout/layout';

export default function NewTicketForm() {
  const [dropDownData, loggedInAgent] =
    useSelector((state) => [state.ticketManagement.dropDownValues, state.app.userDetails]);

  return (
    <Layout >
      <FormData ticketResources={dropDownData} loggedInAgent={loggedInAgent}/>
    </Layout>

  );
}