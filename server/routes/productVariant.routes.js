const { authJwt } = require("../middleware");
const controller = require("../controllers/productVariant.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/v1/product-variants", controller.findAllProductVariants);

  app.get("/api/v1/product-variants/:id", controller.findOneProductVariant);

  app.post("/api/v1/product-variants", controller.createProductVariant);

  app.put("/api/v1/product-variants/:id", controller.updateProductVariant);

  app.delete("/api/v1/product-variants/:id", controller.deleteProductVariant);
};
