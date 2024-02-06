const { authJwt } = require("../middleware");
const productController = require("../controllers/product.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get(
    "/api/v1/products",
    [authJwt.verifyToken, authJwt.isAdmin],
    productController.findAllProducts
  );

  app.get(
    "/api/v1/products/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    productController.findProductById
  );

  app.post(
    "/api/v1/products",
    [authJwt.verifyToken, authJwt.isAdmin],
    productController.createProduct
  );

  app.put(
    "/api/v1/products/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    productController.updateProductById
  );

  app.delete(
    "/api/v1/products/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    productController.deleteProductById
  );
};
