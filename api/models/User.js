/**
 * User.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  tableName: "user",
  attributes: {
    firstName: { columnName: "first_name", type: "string", allowNull: false },
    lastName: { columnName: "last_name", type: "string", allowNull: false },
  },
};
