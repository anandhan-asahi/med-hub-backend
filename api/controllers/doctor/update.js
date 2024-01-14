module.exports = {
  friendlyName: "Update",

  description: "Update doctor.",

  inputs: {
    id: {
      type: "number",
      required: true,
    },
    firstName: {
      type: "string",
    },
    lastName: {
      type: "string",
    },
    doctorProfessionId: {
      type: "number",
    },
    email: {
      type: "string",
    },
    phoneNumber: {
      type: "string",
    },
    isAdmin: {
      type: "boolean",
    },
    yearsOfExperience: {
      type: "number",
    },
    availableTimings: {
      type: "ref",
    },
  },

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
      const doctorDao = Doctor.toDao(inputs);
      await Doctor.updateOne({ id: inputs.id }, doctorDao);
      if (inputs.availableTimings) {
        await DoctorAvailableTiming.destroy({ doctorId: inputs.id });
        const doctorAvailableTimingDaoList = inputs.availableTimings.map(
          (timing) => {
            return {
              ...DoctorAvailableTiming.toDao({
                doctorId: inputs.id,
                availableTimingId: timing,
              }),
            };
          }
        );
        await DoctorAvailableTiming.createEach(doctorAvailableTimingDaoList);
      }
      const [existingDoctor, existingAvailableTimings] = await Promise.all([
        Doctor.findOne({ id: inputs.id }).populate("doctorProfessionId"),
        DoctorAvailableTiming.find({
          where: { doctorId: inputs.id },
          select: ["availableTimingId"],
        }).populate("availableTimingId"),
      ]);

      return exits.success({
        status: sails.config.custom.api_status.success,
        message: this.req.i18n.__("doctor.update.success"),
        data: {
          ...Doctor.toDto(existingDoctor),
          availableTimings: existingAvailableTimings.map(
            (timing) => timing?.availableTimingId
          ),
        },
      });
    } catch (err) {
      sails.log.error("Error occurred at creating a doctor as " + err);
      return exits.exceptionError({
        status: sails.config.custom.api_status.error,
        message: this.req.i18n.__("server.error"),
        error: err,
      });
    }
  },
};
