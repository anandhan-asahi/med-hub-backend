/**
 * User.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  tableName: "patient",
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
    gaurdianName: {
      columnName: "gaurdian_name",
      type: "string",
      allowNull: true,
    },
    age: {
      columnName: "age",
      type: "number",
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
      allowNull: true,
    },
    deleted: {
      columnName: "deleted",
      type: "boolean",
      defaultsTo: false,
    },
  },
  toDao: (values) => {
    const data = {
      firstName: values.firstName,
      lastName: values.lastName,
      gaurdianName: values.gaurdianName,
      age: values.age,
      email: values.email,
      phoneNumber: values.phoneNumber,
      password: values.password,
    };
    Object.keys(data).forEach(
      (key) => data[key] === undefined && delete data[key]
    );
    return data;
  },
  toDto: (values) => {
    const data = {
      id: values.id,
      firstName: values.firstName,
      lastName: values.lastName,
      gaurdianName: values.gaurdianName,
      age: values.age,
      email: values.email,
      phoneNumber: values.phoneNumber,
      deleted: values.deleted,
    };
    Object.keys(data).forEach(
      (key) => data[key] === undefined && delete data[key]
    );
    return data;
  },
};
