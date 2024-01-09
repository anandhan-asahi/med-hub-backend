/**
 * User.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  tableName: "doctor_appointment",
  attributes: {
    patientId: {
      columnName: "patient_id",
      model: "Patient",
    },
    availableTimingId: {
      columnName: "available_timing_id",
      model: "AvailableTiming",
    },
    deleted: {
      columnName: "deleted",
      type: "boolean",
      defaultsTo: false,
    },
  },
};
