/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your actions.
 *
 * For more information on configuring policies, check out:
 * https://sailsjs.com/docs/concepts/policies
 */

module.exports.policies = {
  /***************************************************************************
   *                                                                          *
   * Default policy for all controllers and actions, unless overridden.       *
   * (`true` allows public access)                                            *
   *                                                                          *
   ***************************************************************************/
  // '*': true,
  "*": "authenticate",
  "doctor/login": true,
  "doctor/create": true,
  "patient/login": true,
  "patient/create": true,
  "available-timing/fetch": true,
  "doctor/fetch-professions": true,
  "auth/refresh-token": true,
};
