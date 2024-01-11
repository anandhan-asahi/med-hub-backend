/**
 * Seed Function
 * (sails.config.bootstrap)
 *
 * A function that runs just before your Sails app gets lifted.
 * > Need more flexibility?  You can also create a hook.
 *
 * For more information on seeding your app with fake data, check out:
 * https://sailsjs.com/config/bootstrap
 */

module.exports.bootstrap = async function () {
  // By convention, this is a good place to set up fake data during development.
  //
  // For example:
  // ```
  // // Set up fake development data (or if we already have some, avast)
  // if (await User.count() > 0) {
  //   return;
  // }
  //
  // await User.createEach([
  //   { emailAddress: 'ry@example.com', fullName: 'Ryan Dahl', },
  //   { emailAddress: 'rachael@example.com', fullName: 'Rachael Shaw', },
  //   // etc.
  // ]);
  // ```
  // Db-migrate will trigger
  // var DBMigrate = require("db-migrate");
  // // Getting an instance of dbmigrate
  // var dbmigrate = DBMigrate.getInstance(true, {
  //   env: sails.config.environment,
  // });
  // // Getting the db migrated
  // dbmigrate.up().then(async (res) => {
  //   if (res) {
  //     sails.log("DB UP Migrated successfully");
  //   }
  //   return;
  // });
  const [existingDoctorProfessions, existingAvailableTimings] =
    await Promise.all([DoctorProfession.find(), AvailableTiming.find()]);
  if (existingDoctorProfessions.length === 0) {
    await sails.services.masterdata.createDoctorProfession();
  }

  if (existingAvailableTimings.length === 0) {
    await sails.services.masterdata.createAvailableTiming();
  }
};
