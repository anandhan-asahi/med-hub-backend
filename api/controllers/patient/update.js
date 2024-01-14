module.exports = {
  friendlyName: "Update",

  description: "Update Patient",

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
    gaurdianName: {
      type: "string",
    },
    age: {
      type: "number",
    },
    email: {
      type: "string",
    },
    phoneNumber: {
      type: "string",
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
      if (inputs.email) {
        const [existingDoctorAccount, existingPatient] = await Promise.all([
          Doctor.findOne({
            where: {
              email: inputs.email,
              deleted: false,
              id: {
                "!=": inputs.id,
              },
            },
          }),
          Patient.findOne({
            email: inputs.email,
            deleted: false,
          }),
        ]);
        if (existingPatient) {
          return exits.alreadyExist({
            status: sails.config.custom.api_status.error,
            message: this.req.i18n.__("patient.already.exist"),
          });
        } else if (existingDoctorAccount) {
          return exits.alreadyExist({
            status: sails.config.custom.api_status.error,
            message: this.req.i18n.__("doctor.already.exist"),
          });
        }
      }
      const patientDao = Patient.toDao(inputs);
      const updatedPatient = await Patient.updateOne(
        { id: inputs.id },
        patientDao
      );
      return exits.success({
        status: sails.config.custom.api_status.success,
        message: this.req.i18n.__("patient.update.success"),
        data: Patient.toDto(updatedPatient),
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
