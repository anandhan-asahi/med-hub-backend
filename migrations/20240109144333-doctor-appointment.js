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
    "doctor_appointment",
    {
      id: {
        type: "int",
        primaryKey: true,
        autoIncrement: true,
      },
      patient_id: {
        type: "int",
        foreignKey: {
          name: "doctor_appointment_patient_fk",
          table: "patient",
          rules: {
            onDelete: "CASCADE",
            onUpdate: "RESTRICT",
          },
          mapping: "id",
        },
      },
      available_timing_id: {
        type: "int",
        foreignKey: {
          name: "doctor_appointment_available_timing_fk",
          table: "available_timing",
          rules: {
            onDelete: "CASCADE",
            onUpdate: "RESTRICT",
          },
          mapping: "id",
        },
      },
      deleted: {
        type: "boolean",
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
