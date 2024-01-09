const bcrypt = require("bcrypt");
module.exports = {
  friendlyName: "Get hashed password",

  description:
    "This helper will return the hashed password based on the given string",

  inputs: {
    password: {
      type: "string",
    },
  },

  exits: {},

  fn: async function (inputs, exits) {
    const hashedPassword = await new Promise((resolve, reject) => {
      bcrypt.hash(
        inputs.password,
        sails.config.custom.bcrypt.saltRounds,
        function (err, hash) {
          if (err) reject(err);
          resolve(hash);
        }
      );
    });
    return hashedPassword;
  },
};
