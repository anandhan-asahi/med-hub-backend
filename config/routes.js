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
  "PUT /api/v1/admin/doctor/auth/login": { action: "doctor/login" },
  "POST /api/v1/admin/doctor": { action: "doctor/create" },
  "GET /api/v1/admin/doctor/:id": {
    action: "doctor/view",
  },
  "PUT /api/v1/admin/doctor/:id": {
    action: "doctor/update",
  },
  "GET /api/v1/admin/doctor/appointments/:id": {
    action: "doctor/appointment/fetch",
  },
  //**** Doctor routes ends****//

  //**** Patient routes****//
  "PUT /api/v1/admin/patient/auth/login": { action: "patient/login" },
  "POST /api/v1/admin/patient": { action: "patient/create" },
  "GET /api/v1/admin/patient/:id": {
    action: "patient/view",
  },
  "PUT /api/v1/admin/patient/:id": {
    action: "patient/update",
  },
  "GET /api/v1/admin/patient/fetch-doctors": {
    action: "patient/fetch-doctors",
  },
  "GET /api/v1/admin/patient/fetch-doctor-timings/:doctorId": {
    action: "patient/fetch-doctor-timings",
  },
  "POST /api/v1/admin/patient/book-appointment/:id": {
    action: "patient/book-appointment",
  },
  "GET /api/v1/admin/patient/my-bookings/:id": {
    action: "patient/my-bookings/fetch",
  },
  //**** Patient routes ends****//

  //**** Available routes****//
  "GET /api/v1/admin/available-timing": {
    action: "available-timing/fetch",
  },
};
