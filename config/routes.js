/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {
  //**** Doctor routes****//
  "POST /api/v1/admin/doctor": { action: "doctor/create" },
  "GET /api/v1/admin/doctor/:id": {
    action: "doctor/view",
  },
  "PUT /api/v1/admin/doctor/:id": {
    action: "doctor/update",
  },
  //**** Doctor routes ends****//

  //**** Patient routes****//
  "POST /api/v1/admin/patient": { action: "patient/create" },
  "GET /api/v1/admin/patient/:id": {
    action: "patient/view",
  },
  "PUT /api/v1/admin/patient/:id": {
    action: "patient/update",
  },
  //**** Patient routes ends****//

  //**** Available routes****//
  "GET /api/v1/admin/available-timing": {
    action: "available-timing/fetch",
  },
};
