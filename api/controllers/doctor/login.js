const bcrypt = require("bcrypt");
module.exports = {
  friendlyName: "Login",

  description: "Doctor user",

  inputs: {
    email: {
      type: "string",
      required: true,
    },
    password: {
      type: "string",
      required: true,
    },
  },

  exits: {
    success: {
      statusCode: 200,
    },
    doctorNotFound: {
      statusCode: 404,
    },
    passwordMismatch: {
      statusCode: 406,
    },
    exceptionError: {
      statusCode: 500,
    },
  },

  fn: async function ({ email, password }, exits) {
    try {
      const existingDoctor = await Doctor.findOne({ email: email });
      if (!existingDoctor) {
        return exits.doctorNotFound({
          status: sails.config.custom.api_status.error,
          message: this.req.i18n.__("doctor.not.found"),
        });
      }
      const match = await bcrypt.compare(password, existingUser.password);
      if (match) {
        const auth = await sails.helpers.getJwtToken.with({
          entryPoint: this.req.path.includes("mobile") ? "mobile" : "admin",
          data: existingUser,
          type: "authToken",
        });
        const refresh = await sails.helpers.getJwtToken.with({
          entryPoint: this.req.path.includes("mobile") ? "mobile" : "admin",
          data: existingUser.id,
          type: "refreshToken",
        });
        return exits.success({
          status: sails.config.custom.api_status.success,
          data: {
            auth,
            refresh,
          },
        });
      } else {
        return exits.passwordMismatch({
          status: sails.config.custom.api_status.error,
          message: this.req.i18n.__("admin.password.mismatch"),
        });
      }
    } catch (err) {
      return exits.exceptionError({
        status: sails.config.custom.api_status.error,
        message: this.req.i18n.__("server.error"),
        error: err.message,
      });
    }
  },
};
