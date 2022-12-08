import User from './../models/User.js';

/**
 * Get all users
 * @returns all the users 'users' colection
 */
export const getAll = () => User.find({});

/**
* Get a user by id
* @param {*} id id of the user resource
* @returns a user resource
*/
export const get = (id) => {
  return User.findById(id);
};
 
/**
* Create a user
* @param {*} user a user resource to be created
* @returns a user resource
*/
export const save = (user) => {
  return new User(user).save();
};
  
/**
* Delete a user
* @param {*} id id of the user resource to be deleted
* @returns the user resource that was deleted
*/
export const remove = (id) => {
  return User.findByIdAndDelete(id);
};

export const findByEmail = (email_id) => {
  return  User.findOne({email: email_id}).exec();
}

/**
* Update user password
* @param {*} id id of the user resource to be updated
* @returns the user resource that was updated
*/
export const updatepassword = (user, options) => {
  console.log("Uesr to be updated", user)
  return User.findByIdAndUpdate(user.id, user, options).exec();
}