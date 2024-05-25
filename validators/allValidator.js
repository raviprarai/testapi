const Joi = require("joi");
const UserSchema = Joi.object({
    uniqueId: Joi.string(),
    title: Joi.string().required(),
    name: Joi.string().required(),
    password:Joi.string().required(),
    email: Joi.string().email().required(),
    phonenumber: Joi.number().required()
  });
  const updateUserSchema = Joi.object({
    title: Joi.string(),
    name: Joi.string(),
    email: Joi.string().email(),
    phonenumber: Joi.number()
  });
  const loginScehma = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
  });
  module.exports = {
    UserSchema,updateUserSchema,loginScehma
  };