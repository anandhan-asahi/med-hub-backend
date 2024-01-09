module.exports = {
  friendlyName: "Update",

  description: "Update Patient",

  inputs: {
    id: {
      type: "number",
      required: true,
    },
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
      const patientDao = Patient.toDao(inputs);
      const updatedPatient = await Patient.updateOne(
        { id: inputs.id },
        patientDao
      );
      return exits.success({
        status: sails.config.custom.api_status.success,
        message: this.req.i18n.__("patient.update.success"),
        data: Patient.toDto(updatedPatient),
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
