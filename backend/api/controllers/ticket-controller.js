/**
 * Ticket controller
 * Author: Aravind Dasarathy
 * Date: 08/12/2022
 *
 * @module controllers/ticket-controller
 * @requires services/ticket-service
 * @requires constants
 * @requires express
 */

import * as ticketService from '../services/ticket-service.js';
import constants from '../constants.js';

const statusCodes = constants.statusCodes;

/**
 *
 * @param {*} obj the body to be sent back as response
 * @param {*} response the response object
 * @param {*} code  the status code to be sent back
 */
const setResponse = (obj, response, code = statusCodes.OK) => {
  response.status(code);
  response.json(obj);
};

/**
 *
 * @param {*} err error to be sent back
 * @param {*} response the response object
 * @param {*} code the status code to be sent back
 */
const setError = (err, response, code = statusCodes.INTERNAL_SERVER_ERROR) => {
  const message = err || 'Something went wrong';

  response.status(code);
  response.json(message);
};

/**
 * Get all tickets
 * @param {*} req request object
 * @param {*} res response object
 */
export const getAll = async (req, res) => {
  try {
    const tickets = await ticketService.getAll();

    setResponse({
      message: 'Tickets retrieved successfully',
      data: tickets
    }, res);
  } catch (error) {
    setError(error, res);
  }
};

/**
 * Get a ticket by id
 * @param {*} req request object
 * @param {*} res response object
 */
export const get = async (req, res) => {
  try {
    const ticket = await ticketService.get(req.params.id);

    if (!ticket) {
      return setError({ error: 'Ticket not found' }, res, statusCodes.NOT_FOUND);
    }

    setResponse({
      message: 'Ticket retrieved successfully',
      data: ticket
    }, res);
  } catch (error) {
    setError(error, res);
  }
};

/**
 * Create a ticket
 * @param {*} req request object
 * @param {*} res response object
 */
export const post = async (req, res) => {
  try {
    if (!req.body) {
      return setError({ error: 'Content cannot be empty' }, res, statusCodes.BAD_REQUEST);
    }

    if (!req.body.subject) {
      return setError({ error: 'Subject cannot be empty' }, res, statusCodes.BAD_REQUEST);
    }

    if (!req.body.description) {
      return setError({ error: 'Description cannot be empty' }, res, statusCodes.BAD_REQUEST);
    }

    const ticket =req.body;
    const savedticket = await ticketService.save(ticket);

    setResponse({
      message: 'Ticket saved successfully',
      data: savedticket
    }, res, statusCodes.CREATED);
  } catch (error) {
    setError(error, res);
  }
};

/**
 * Update a ticket
 * @param {*} req request object
 * @param {*} res response object
 */
export const put = async (req, res) => {
  try {
    const ticket = req.body;
    const updatedTicket = await ticketService.update(req.params.id, ticket, { new: true });

    if (!updatedTicket) {
      return setError({ error: 'Ticket not found' }, res, statusCodes.NOT_FOUND);
    }

    setResponse({
      message: 'Ticket updated successfully',
      data: updatedTicket
    }, res, statusCodes.OK);
  } catch (error) {
    setError(error, res);
  }
};

/**
 * Delete a ticket
 * @param {*} req request object
 * @param {*} res response object
 */
export const remove = async (req, res) => {
  try {
    const ticket = await ticketService.remove(req.params.id);

    setResponse({
      message: 'Ticket deleted successfully',
      data: ticket
    }, res, statusCodes.OK);
  } catch (error) {
    setError(error, res);
  }
};