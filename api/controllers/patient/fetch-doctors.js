module.exports = {
  friendlyName: "Fetch",

  description: "Fetch Doctor",

  inputs: {
    search: {
      type: "string",
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
      const existingDoctors = await Doctor.find({ deleted: false }).populate(
        "doctorProfessionId"
      );
      return exits.success({
        status: sails.config.custom.api_status.success,
        message: this.req.i18n.__("doctors.fetch.success"),
        data: Doctor.toDtoList(existingDoctors),
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
