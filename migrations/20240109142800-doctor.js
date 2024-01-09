"use strict";

var dbm;
var type;
var seed;

/**
 * We receive the dbmigrate dependency from dbmigrate initially.
 * This enables us to not have to rely on NODE_PATH.
 */
exports.setup = function (options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function (db, callback) {
  db.createTable(
    "doctor",
    {
      id: {
        type: "int",
        primaryKey: true,
        autoIncrement: true,
      },
      first_name: {
        type: "string",
      },
      last_name: {
        type: "string",
      },
      doctor_profession_id: {
        type: "int",
        foreignKey: {
          name: "doctor_doctor_profession_fk",
          table: "doctor_profession",
          rules: {
            onDelete: "CASCADE",
            onUpdate: "RESTRICT",
          },
          mapping: "id",
        },
      },
      email: {
        type: "string",
        unique: true,
      },
      phone_number: {
        type: "string",
        unique: true,
      },
      password: {
        type: "string",
      },
      deleted: {
        type: "boolean",
      },
      is_admin: {
        type: "boolean",
      },
      years_of_experience: {
        type: "int",
      },
    },
    function (err) {
      if (err) return callback(err);
      return callback();
    }
  );
};

exports.down = function (db) {
  return null;
};

exports._meta = {
  version: 1,
};
