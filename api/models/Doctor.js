/**
 * User.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  tableName: "doctor",
  attributes: {
    firstName: {
      columnName: "first_name",
      type: "string",
      allowNull: true,
    },
    lastName: {
      columnName: "last_name",
      type: "string",
      allowNull: true,
    },
    doctorProfessionId: {
      columnName: "doctor_profession_id",
      model: "DoctorProfession",
    },
    email: {
      columnName: "email",
      type: "string",
    },
    phoneNumber: {
      columnName: "phone_number",
      type: "string",
      allowNull: true,
    },
    password: {
      columnName: "password",
      type: "string",
    },
    deleted: {
      columnName: "deleted",
      type: "boolean",
      defaultsTo: false,
    },
    isAdmin: {
      columnName: "is_admin",
      type: "boolean",
      defaultsTo: false,
    },
    yearsOfExperience: {
      columnName: "years_of_experience",
      type: "number",
    },
  },
};
