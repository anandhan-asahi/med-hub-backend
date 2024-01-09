module.exports = {
  friendlyName: "Create",

  description: "Create patient",

  inputs: {
    firstName: {
      type: "string",
      required: true,
    },
    lastName: {
      type: "string",
      required: true,
    },
    gaurdianName: {
      type: "string",
      required: true,
    },
    age: {
      type: "number",
    },
    email: {
      type: "string",
      required: true,
    },
    phoneNumber: {
      type: "string",
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
    exceptionError: {
      statusCode: 500,
    },
  },

  fn: async function (inputs, exits) {
    try {
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
      const patientDao = Patient.toDao({ ...inputs, password: hashedPassword });
      await Patient.create(patientDao);
      return exits.success({
        status: sails.config.custom.api_status.success,
        message: this.req.i18n.__("patient.create.success"),
      });
    } catch (err) {
      sails.log.error("Error occurred at creating a doctor as " + err);
      return exits.exceptionError({
        status: sails.config.custom.api_status.error,
        message: this.req.i18n.__("server.error"),
        error: err.message,
      });
    }
  },
};
