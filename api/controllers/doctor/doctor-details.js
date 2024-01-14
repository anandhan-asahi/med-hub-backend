module.exports = {
  friendlyName: "fetch",

  description: "Fetch Doctor",

  inputs: {},

  exits: {
    success: {
      statusCode: 200,
    },
    doctorNotFound: {
      statusCode: 404,
    },
    exceptionError: {
      statusCode: 500,
    },
  },

  fn: async function (inputs, exits) {
    try {
      const [existingDoctor, existingAvailableTimings] = await Promise.all([
        Doctor.findOne({
          id: this.req.doctor.id,
          deleted: false,
        }).populate("doctorProfessionId"),
        DoctorAvailableTiming.find({
          where: { doctorId: this.req.doctor.id },
          select: ["availableTimingId"],
        }).populate("availableTimingId"),
      ]);
      if (!existingDoctor) {
        return exits.doctorNotFound({
          status: sails.config.custom.api_status.error,
          message: this.req.i18n.__("doctor.not.found"),
        });
      }

      return exits.success({
        status: sails.config.custom.api_status.success,
        data: {
          ...Doctor.toDto(existingDoctor),
          availableTimings: existingAvailableTimings.map(
            (timing) => timing?.availableTimingId
          ),
        },
      });
    } catch (err) {
      sails.log.error(
        "Error occurred while fetching the doctor details as " + err
      );
      return exits.exceptionError({
        status: sails.config.custom.api_status.error,
        message: this.req.i18n.__("server.error"),
        error: err.message,
      });
    }
  },
};
