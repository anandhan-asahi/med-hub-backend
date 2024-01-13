module.exports = async (req, res, proceed) => {
  try {
    const verify = await sails.helpers.verifyJwtToken
      .with({
        token: req.headers.authorization,
        type: "authToken",
        entryPoint: req.path.includes("doctor") ? "doctor" : "patient",
      })
      .tolerate("unauthorize", (err) => {
        return res.status(401).send({
          status: sails.config.custom.api_status.error,
          message: req.i18n.__("login.unauth"),
          error: err.raw,
        });
      });
    if (verify.data) {
      req.user = verify.data;
      proceed();
    }
  } catch (err) {
    sails.log.error("Error occured at auth middleware as ", err);
    return res.status(500).send({
      status: sails.config.custom.api_status.error,
      message: req.i18n.__("server.error"),
      error: err.message,
    });
  }
};
