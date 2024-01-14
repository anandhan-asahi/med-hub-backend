const moment = require("moment");

module.exports = {
  friendlyName: "View",

  description: "View Patient Old Bookings",

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

      if (!existingPatient) {
        return exits.patientNotFound({
          status: sails.config.custom.api_status.error,
          message: this.req.i18n.__("patient.not.found"),
        });
      }

      const existingPatientBookings = await DoctorAppointment.find({
        where: {
          patientId: inputs.id,
          appointmentEndTime: {
            "<": moment().format("YYYY-MM-DD HH:mm:ss"),
          },
        },
      }).populate("doctorId");

      return exits.success({
        status: sails.config.custom.api_status.success,
        data: DoctorAppointment.toPatientBookingDtoList(
          existingPatientBookings
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
