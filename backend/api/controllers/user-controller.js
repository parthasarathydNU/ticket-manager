import * as userService from '../services/user-service.js';
import constants from './../constants.js'; 

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
 * Get all users
 * @param {*} req request object
 * @param {*} res response object
*/
export const getAll = async (req, res) => {
    try {
      const users = await userService.getAll();
  
      setResponse({
        message: 'Users retrieved successfully',
        data: users
      }, res);
    } catch (error) {
      setError(error, res);
    }
};

/*
* Get a user by id
* @param {*} req request object
* @param {*} res response object
*/
export const get = async (req, res) => {
 try {
   const user = await userService.get(req.params.id);

   if (!user) {
     return setError({ error: 'User not found' }, res, statusCodes.NOT_FOUND);
   }

   setResponse({
     message: 'User retrieved successfully',
     data: user
   }, res);
 } catch (error) {
   setError(error, res);
 }
};

/**
 * Create a user
 * @param {*} req request object
 * @param {*} res response object
*/
export const post = async (req, res) => {
    try {
      if (!req.body) {
        return setError({ error: 'Content cannot be empty' }, res, statusCodes.BAD_REQUEST);
      }
      
      if (!req.body.firstname) {
        return setError({ error: 'First Name cannot be empty' }, res, statusCodes.BAD_REQUEST);
      }

      if (!req.body.lastname) {
        return setError({ error: 'Last Name cannot be empty' }, res, statusCodes.BAD_REQUEST);
      }

      if (!req.body.phoneNumber) {
        return setError({ error: 'Phone Number cannot be empty' }, res, statusCodes.BAD_REQUEST);
      }

      if (!req.body.email) {
        return setError({ error: 'Email cannot be empty' }, res, statusCodes.BAD_REQUEST);
      }
  
      if (!req.body.role) {
        return setError({ error: 'Role cannot be empty' }, res, statusCodes.BAD_REQUEST);
      }
      
      if (!req.body.password) {
        return setError({ error: 'Password cannot be empty' }, res, statusCodes.BAD_REQUEST);
      }

      if(await userService.findByEmail(req.body.email) != null) {
        return setError({ error: 'Email id already exists' }, res, statusCodes.BAD_REQUEST);
      }

      const user =req.body;
      const savedUser = await userService.save(user);
  
      setResponse({
        message: 'User saved successfully',
        data: savedUser
      }, res, statusCodes.CREATED);
    } catch (error) {
      setError(error, res);
    }
};

/**
 * Delete a user
 * @param {*} req request object
 * @param {*} res response object
*/
export const remove = async (req, res) => {
    try {
      const user = await userService.remove(req.params.id);
  
      setResponse({
        message: 'user deleted successfully',
        data: user
      }, res, statusCodes.OK);
    } catch (error) {
      setError(error, res);
    }
};

/**
 * User Authentication
 * @param {*} req request object
 * @param {*} res response object
*/
export const auth = async(req, res) => {
  try {
    const user = await userService.findByEmail(req.body.email);
    if(user === null) {
      return setError({ error: 'Email not registered' }, res, statusCodes.BAD_REQUEST)
    }

    if((user.password).localeCompare(req.body.password) === 0) {
      return setResponse({
        message: 'Authenticated',
        data: user
      }, res, statusCodes.OK)
    }

    return setError({ error: 'Incorrect Password' }, res, statusCodes.BAD_REQUEST)
  } catch (error) {
    setError(error, res);
  }
}

export const put = async(req, res) => {
  try {
    const user = await userService.findByEmail(req.body.email);
    if(user === null) {
      return setError({ error: 'Email not registered' }, res, statusCodes.BAD_REQUEST)
    }
    user.password = req.body.password;
    const updatepassword = await userService.updatepassword(user, { new: true });
    setResponse(updatepassword, res);

  } catch (error) {
    setError(error, res);
  }
}