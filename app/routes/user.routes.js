const { authJwt } = require("../middlewares");
const controller = require("../controllers/user.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/test/all", controller.allAccess);

  //user
  app.get("/api/test/user", [authJwt.verifyToken], controller.userBoard);
  app.get("/api/user/list", [authJwt.verifyToken], controller.allUsers); //get all user
  app.get("/api/user/:id", [authJwt.verifyToken], controller.showUser); //get all user

  //moderator
  app.get(
    "/api/test/mod",
    [authJwt.verifyToken, authJwt.isModerator],
    controller.moderatorBoard
  );

  //admin
  app.get(
    "/api/test/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
  );
};