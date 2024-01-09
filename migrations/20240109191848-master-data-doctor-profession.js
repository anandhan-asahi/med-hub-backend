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
  const doctorProfessions = [
    {
      name: "Allergists/Immunologists",
    },
    {
      name: "Anesthesiologists",
    },
    {
      name: "Cardiologists",
    },
    {
      name: "Colon and Rectal Surgeons",
    },
    {
      name: "Critical Care Medicine Specialists",
    },
    {
      name: "Dermatologists",
    },
    {
      name: "Endocrinologists",
    },
    {
      name: "Emergency Medicine Specialists",
    },
    {
      name: "Family Physicians",
    },
    {
      name: "Gastroenterologists",
    },
    {
      name: "Internists",
    },
    {
      name: "Others",
    },
  ];
  doctorProfessions.forEach((doctorProfession) => {
    console.log("am hererere");
    db.insert("doctor_profession", doctorProfession, (err) => {
      if (err) {
        console.error("Error inserting doctor profession:", err);
        return callback(err);
      }
      console.log("Inserted doctor profession:", doctorProfession);
    });
  });
  return callback();
};

exports.down = function (db) {
  return null;
};

exports._meta = {
  version: 1,
};
