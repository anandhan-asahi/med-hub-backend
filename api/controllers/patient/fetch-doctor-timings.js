module.exports = {
  friendlyName: "Fetch",

  description: "Fetch Doctor Timings",

  inputs: {
    doctorId: {
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
    doctorNotFound: {
      statusCode: 404,
    },
    exceptionError: {
      statusCode: 500,
    },
  },

  fn: async function (inputs, exits) {
    try {
      const [existingDoctor, existingDoctorAppointments] = await Promise.all([
        Doctor.findOne({
          id: inputs.doctorId,
          deleted: false,
        }),
        DoctorAppointment.find({
          where: { doctorId: inputs.doctorId },
          select: ["availableTimingId"],
        }),
      ]);
      if (!existingDoctor) {
        return exits.doctorNotFound({
          status: sails.config.custom.api_status.error,
          message: this.req.i18n.__("doctor.not.found"),
        });
      }
      const existingDoctorTimings = await DoctorAvailableTiming.find({
        where: {
          doctorId: existingDoctor.id,
          availableTimingId: {
            nin: existingDoctorAppointments.map(
              (appointment) => appointment.availableTimingId
            ),
          },
        },
      }).populate("availableTimingId");
      return exits.success({
        status: sails.config.custom.api_status.success,
        message: this.req.i18n.__("doctor.timings.fetch.success"),
        data: DoctorAvailableTiming.toDoctorTimingPatientDtoList(
          existingDoctorTimings
        ),
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
