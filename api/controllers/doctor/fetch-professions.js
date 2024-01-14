module.exports = {
  friendlyName: "View",

  description: "View Doctor",

  inputs: {},

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
      const existingDoctorProfessions = await DoctorProfession.find();
      return exits.success({
        status: sails.config.custom.api_status.success,
        data: existingDoctorProfessions,
      });
    } catch (err) {
      sails.log.error(
        "Error occurred while fetching the doctor professions as " + err
      );
      return exits.exceptionError({
        status: sails.config.custom.api_status.error,
        message: this.req.i18n.__("server.error"),
        error: err.message,
      });
    }
  },
};
