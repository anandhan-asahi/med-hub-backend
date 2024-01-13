const bcrypt = require("bcrypt");
module.exports = {
  friendlyName: "Login",

  description: "Patient Login",

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
    patientNotFound: {
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
      const existingPatient = await Patient.findOne({ email: email });
      if (!existingPatient) {
        return exits.patientNotFound({
          status: sails.config.custom.api_status.error,
          message: this.req.i18n.__("patient.not.found"),
        });
      }
      const match = await bcrypt.compare(password, existingPatient.password);
      if (match) {
        const auth = await sails.helpers.getJwtToken.with({
          entryPoint: "patient",
          data: existingPatient,
          type: "authToken",
        });
        const refresh = await sails.helpers.getJwtToken.with({
          entryPoint: "patient",
          data: existingPatient.id,
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
          message: this.req.i18n.__("patient.password.mismatch"),
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
