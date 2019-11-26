const Joi = require('joi');

function getErrorMessage(code = '', name = '') {
    switch(code) {
        case '23505': 
            return `The username ${name} already exist`;
        default:
            return 'Something went wrong. Try again!';
    }
}
function validateUser(user) {
    const schema = {
      username: Joi.string().min(3).max(50).required(),
      email: Joi.string().min(5).max(255).required().email(),
      password: Joi.string().min(3).max(255).required()
    };
  
    return Joi.validate(user, schema);
}

module.exports = { getErrorMessage, validateUser };