/**
 * Ticket Schema
 * Author: Aravind Dasarathy
 * Date: 08/12/2022
 *
 * @module schema/ticket
 * @requires constants
 */

// marking 'tags' and 'responder_id' as not required.

import constants from '../constants.js';

const ticketSchema = {
  subject: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: constants.status,
    default: 'Open',
    required: true
  },
  priority: {
    type: String,
    enum: constants.priority,
    default: 'Low',
    required: true
  },
  requester_id: {
    type: String,
    required: true
  },
  tags: {
    type: [
      String
    ]
  },
  responder_id: {
    type: String
  }
};

export default ticketSchema;