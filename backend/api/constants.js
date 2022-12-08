export default {
  status: ['Open', 'In Progress', 'Resolved', 'Closed'],
  priority: ['Low', 'Medium', 'High', "Urgent"],
  types: ['Bug', 'Feature', 'Task'],
  statusCodes: {
    OK: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500
  }
};