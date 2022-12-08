import mongoose from 'mongoose';

import ticketSchema from '../schema/ticket.js';

const schema = new mongoose.Schema(ticketSchema, { timestamps: true, versionKey: false });

/*
  * The 'toJSON' method of schema is used to generate the resource for the schema
  * We can add custom keys to the resource by adding them to the 'toJSON' method
*/
schema.method('toJSON', function() {
  const { _id, ...object } = this.toObject();

  object.id = _id;

  return object;
});

const Ticket = mongoose.model('Ticket', schema);

export default Ticket;