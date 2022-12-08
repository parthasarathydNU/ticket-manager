/**
 * Ticket service
 * Author: Aravind Dasarathy
 * Date: 08/12/2022
 *
 * @module services/ticket-service
 * @requires models/Ticket
 */

import Ticket from '../models/Ticket.js';

/**
 * Get all tickets
 * @returns all the ticket resource in the 'tickets' colection
 */
export const getAll = () => Ticket.find({});

/**
 * Get a ticket by id
 * @param {*} id id of the ticket resource
 * @returns a ticket resource
 */
export const get = (id) => {
  return Ticket.findById(id);
};

/**
 * Create a ticket
 * @param {*} ticket a ticket resource to be created
 * @returns a ticket resource
 */
export const save = (ticket) => {
  return new Ticket(ticket).save();
};

/**
 * Update a ticket
 * @param {*} id id of the ticket  resource to be updated
 * @param {*} ticket the ticket content to be updated
 * @param {*} opts options that configures mongoose update method
 * @returns the updated ticket resource
 */
export const update = (id, ticket, opts) => {
  return Ticket.findByIdAndUpdate(id, ticket, opts);
};

/**
 * Delete a ticket
 * @param {*} id id of the ticket resource to be deleted
 * @returns the ticket resource that was deleted
 */
export const remove = (id) => {
  return Ticket.findByIdAndDelete(id);
};
