const moment = require("moment");
module.exports = {
  friendlyName: "View",

  description: "View Patient",

  inputs: {
    id: {
      type: "number",
      required: true,
    },
    doctorId: {
      type: "number",
      required: true,
    },
    availableTimingId: {
      type: "number",
      required: true,
    },
    appointmentDate: {
      type: "ref",
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
      const [existingPatient, existingAvailableTiming] = await Promise.all([
        Patient.findOne({
          id: inputs.id,
          deleted: false,
        }),
        AvailableTiming.findOne({
          id: inputs.availableTimingId,
        }),
      ]);
      if (!existingPatient) {
        return exits.patientNotFound({
          status: sails.config.custom.api_status.error,
          message: this.req.i18n.__("patient.not.found"),
        });
      }

      const convertDataString = async (index) => {
        const timeString = existingAvailableTiming.name
          .split("-")
          [index].trim();
        const dateString = inputs.appointmentDate;

        // Parsing the strings into Moment.js objects
        const timeMoment = moment(timeString, "hh:mmA");
        const dateMoment = moment(dateString, "YYYY-MM-DD 00:00:00");

        // Combining date and time
        const combinedMoment = dateMoment.set({
          hour: timeMoment.hour(),
          minute: timeMoment.minute(),
          second: 0, // Am assuming seconds to 00
        });

        return combinedMoment.format("YYYY-MM-DD HH:mm:ss").toString();
      };

      const appointmentStartTime = await convertDataString(0);
      const appointmentEndTime = await convertDataString(1);

      const doctorAppointmentDao = DoctorAppointment.toDao({
        ...inputs,
        patientId: inputs.id,
        appointmentStartTime,
        appointmentEndTime,
      });
      await DoctorAppointment.create(doctorAppointmentDao);

      return exits.success({
        status: sails.config.custom.api_status.success,
        message: this.req.i18n.__("appointment.book.success"),
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
