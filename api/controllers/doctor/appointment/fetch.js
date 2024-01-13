module.exports = {
  friendlyName: "View",

  description: "View Doctor Appoontments",

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
    doctorNotFound: {
      statusCode: 404,
    },
    exceptionError: {
      statusCode: 500,
    },
  },

  fn: async function (inputs, exits) {
    try {
      const existingDoctor = await Doctor.findOne({
        id: inputs.id,
        deleted: false,
      });
      if (!existingDoctor) {
        return exits.doctorNotFound({
          status: sails.config.custom.api_status.error,
          message: this.req.i18n.__("doctor.not.found"),
        });
      }
      const existingDoctorAppointments = await DoctorAppointment.find({
        doctorId: inputs.id,
      }).populate("patientId");

      return exits.success({
        status: sails.config.custom.api_status.success,
        data: DoctorAppointment.toDoctorAppointmentDtoList(
          existingDoctorAppointments
        ),
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
