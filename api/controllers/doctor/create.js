const bcrypt = require("bcrypt");
module.exports = {
  friendlyName: "Create",

  description: "Create doctor.",

  inputs: {
    firstName: {
      type: "string",
      required: true,
    },
    lastName: {
      type: "string",
      required: true,
    },
    doctorProfessionId: {
      type: "number",
      required: true,
    },
    email: {
      type: "string",
      required: true,
    },
    phoneNumber: {
      type: "string",
    },
    password: {
      type: "string",
      required: true,
    },
    isAdmin: {
      type: "boolean",
    },
    yearsOfExperience: {
      type: "number",
    },
    availableTimings: {
      type: "ref",
      required: true,
    },
  },

  exits: {
    success: {
      statusCode: 200,
    },
    alreadyExist: {
      statusCode: 409,
    },
    exceptionError: {
      statusCode: 500,
    },
  },

  fn: async function (inputs, exits) {
    try {
      const [existingDoctor, existingPatient] = await Promise.all([
        Doctor.findOne({
          email: inputs.email,
          deleted: false,
        }),
        Patient.findOne({
          email: inputs.email,
          deleted: false,
        }),
      ]);
      if (existingDoctor) {
        return exits.alreadyExist({
          status: sails.config.custom.api_status.error,
          message: this.req.i18n.__("doctor.already.exist"),
        });
      } else if (existingPatient) {
        return exits.alreadyExist({
          status: sails.config.custom.api_status.error,
          message: this.req.i18n.__("patient.already.exist"),
        });
      }

      const hashedPassword = await new Promise((resolve, reject) => {
        bcrypt.hash(
          inputs.password,
          sails.config.custom.bcrypt.saltRounds,
          function (err, hash) {
            if (err) reject(err);
            resolve(hash);
          }
        );
      });

      const doctorDao = Doctor.toDao({ ...inputs, password: hashedPassword });
      const createdDoctor = await Doctor.create(doctorDao).fetch();
      const doctorAvailableTimingDaoList = inputs.availableTimings.map(
        (timing) => {
          return {
            ...DoctorAvailableTiming.toDao({
              doctorId: createdDoctor.id,
              availableTimingId: timing,
            }),
          };
        }
      );
      await DoctorAvailableTiming.createEach(doctorAvailableTimingDaoList);
      return exits.success({
        status: sails.config.custom.api_status.success,
        message: this.req.i18n.__("doctor.create.success"),
      });
    } catch (err) {
      sails.log.error("Error occurred at creating a doctor as " + err);
      return exits.exceptionError({
        status: sails.config.custom.api_status.error,
        message: this.req.i18n.__("server.error"),
        error: err.message,
      });
    }
  },
};
