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
    password: {
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
      const existingDoctor = await Doctor.findOne({ id: inputs.id });
      if (!existingDoctor) {
        return exits.doctorNotFound({
          status: sails.config.custom.api_status.error,
          message: this.req.i18n.__("doctor.not.found"),
        });
      }
      const doctorDao = Doctor.toDao(inputs);
      const updatedDoctor = await Doctor.updateOne(
        { id: existingDoctor.id },
        doctorDao
      );
      if (inputs.availableTimings) {
        await DoctorAvailableTiming.destroy({ doctorId: existingDoctor.id });
        const doctorAvailableTimingDaoList = inputs.availableTimings.map(
          (timing) => {
            return {
              ...DoctorAvailableTiming.toDao({
                doctorId: existingDoctor.id,
                availableTimingId: timing,
              }),
            };
          }
        );
        await DoctorAvailableTiming.createEach(doctorAvailableTimingDaoList);
      }
      return exits.success({
        status: sails.config.custom.api_status.success,
        message: this.req.i18n.__("doctor.update.success"),
        data: Doctor.toDto(updatedDoctor),
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
