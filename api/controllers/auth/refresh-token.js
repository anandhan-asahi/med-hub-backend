module.exports = {
  friendlyName: "Refresh Token",

  description: `This API is used to provide the latest auth token and refresh token after expiring 
  the auth token. Kindly note that this API will give you the latest auth token only if your refresh 
  token is not expired, if your refresh token is expired then you have to again login to the respective
  portal`,

  inputs: {
    refresh: {
      type: "string",
      required: true,
    },
  },

  exits: {
    success: {
      statusCode: 200,
    },
    unauthorize: {
      statusCode: 401,
    },
    exceptionError: {
      statusCode: 500,
    },
  },

  fn: async function ({ refresh }, exits) {
    try {
      const verify = await sails.helpers.verifyJwtToken
        .with({
          token: refresh,
          type: "refreshToken",
          entryPoint: this.req.path.includes("/doctor/") ? "doctor" : "patient",
        })
        .tolerate("unauthorize", (err) => {
          if (err) {
            return exits.unauthorize({
              status: sails.config.custom.api_status.error,
              message: this.req.i18n.__("login.unauth"),
              error: err.raw,
            });
          }
        });

      if (verify) {
        const existingDoctor = await Doctor.findOne({
          id: verify.data,
          deleted: false,
        });
        if (!existingDoctor) {
          return exits.unauthorize({
            status: sails.config.custom.api_status.error,
            message: this.req.i18n.__("login.deleted"),
          });
        }
        const compressedData = { ...existingDoctor };
        delete compressedData.password;
        delete compressedData.deleted;
        const [auth, refresh] = await Promise.all([
          sails.helpers.getJwtToken.with({
            entryPoint: this.req.path.includes("doctor") ? "doctor" : "patient",
            data: compressedData,
            type: "authToken",
          }),
          sails.helpers.getJwtToken.with({
            entryPoint: this.req.path.includes("doctor") ? "doctor" : "patient",
            data: compressedData.id,
            type: "refreshToken",
          }),
        ]);
        return exits.success({
          status: sails.config.custom.api_status.success,
          message: this.req.i18n.__("login.refresh"),
          data: { auth, refresh },
        });
      }
    } catch (err) {
      sails.log.error("Error occured at refresh token as ", err.message);
      return exits.exceptionError({
        status: sails.config.custom.api_status.error,
        message: this.req.i18n.__("server.error"),
        error: err.message,
      });
    }
  },
};
