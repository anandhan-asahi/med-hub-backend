module.exports = {
  friendlyName: "View",

  description: "View Patient",

  inputs: {
    id: {
      type: "number",
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
    exceptionError: {
      statusCode: 500,
    },
  },

  fn: async function (inputs, exits) {
    try {
      const existingPatient = await Patient.findOne({
        id: inputs.id,
        deleted: false,
      });
      return exits.success({
        status: sails.config.custom.api_status.success,
        data: Patient.toDto(existingPatient),
      });
    } catch (err) {
      sails.log.error(
        "Error occurred while fetching the patient details as " + err
      );
      return exits.exceptionError({
        status: sails.config.custom.api_status.error,
        message: this.req.i18n.__("server.error"),
        error: err.message,
      });
    }
  },
};
