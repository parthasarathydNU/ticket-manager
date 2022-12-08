/**
 * Entry point for the server.
 * Author: Aravind Dasarathy
 * Date: 08/12/2022
 *
 * @module server
 * @requires app
 */

import app from './api/app.js';

const PORT = 8080;

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
