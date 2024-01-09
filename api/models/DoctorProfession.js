/**
 * DoctorProfession.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  tableName: "doctor_profession",
  attributes: {
    name: {
      columnName: "name",
      type: "string",
      required: true,
    },
  },
};
