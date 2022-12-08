import TicketRouter from './ticket-route.js';
import UserRouter from './user-route.js';

export default (app) => {
  app.use('/ticket', TicketRouter);
  app.use('/user', UserRouter);
};