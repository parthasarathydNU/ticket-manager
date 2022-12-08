import mongoose from "mongoose";
import userSchema from "./../schema/user.js";

const schema = new mongoose.Schema(userSchema, {versionKey: false});

/*
  * The 'toJSON' method of schema is used to generate the resource for the schema
  * We can add custom keys to the resource by adding them to the 'toJSON' method
*/
schema.method('toJSON', function() {
    const { _id, ...object } = this.toObject();
  
    object.id = _id;
  
    return object;
});

const User = mongoose.model('User', schema);
export default User;