const jwt = require("jsonwebtoken");
module.exports = {
  friendlyName: "Verify auth and refresh token",

  description:
    "Verify JWT authenticated token based on seperate secret key for seperate endpoints ",

  inputs: {
    entryPoint: {
      type: "string",
      required: true,
    },
    token: {
      type: "ref",
    },
    type: {
      type: "string",
    },
  },

  exits: {
    unauthorize: {},
  },

  fn: async function ({ type, token, entryPoint }, exits) {
    const verify = await jwt.verify(
      token,
      sails.config[type][entryPoint].secretKey,
      (err, data) => {
        if (err) {
          return exits.unauthorize(err.message);
        }
        return exits.success(data);
      }
    );
  },
};
