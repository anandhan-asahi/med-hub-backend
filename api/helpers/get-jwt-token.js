const jwt = require("jsonwebtoken");
const moment = require("moment");
module.exports = {
  friendlyName: "Generate auth token and refresh token",

  description:
    "Get JWT authenticated token with specific time period validation based on the entry point",

  inputs: {
    entryPoint: {
      type: "string",
      required: true,
    },
    data: {
      type: "ref",
    },
    type: {
      type: "string",
    },
  },

  exits: {
    error: {
      description: "failure",
    },
  },

  fn: async function ({ entryPoint, data, type }, exits) {
    // Get auth token.
    try {
      let token = await jwt.sign(
        {
          data,
        },
        sails.config[type][entryPoint].secretKey,
        { expiresIn: sails.config[type][entryPoint].life }
      );
      return exits.success({
        token,
        exp: moment()
          .add(sails.config[type][entryPoint].life, "seconds")
          .format(),
      });
    } catch (err) {
      sails.log.error(err);
      exits.error();
    }
  },
};
