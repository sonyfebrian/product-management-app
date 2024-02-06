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

  // Retrieve all products
  app.get("/api/v1/products", productController.findAllProducts);

  // Retrieve a single product by id
  app.get("/api/v1/products/:id", productController.findProductById);

  // Create a new product
  app.post("/api/v1/products", productController.createProduct);

  // Update a product by id
  app.put("/api/v1/products/:id", productController.updateProductById);

  // Delete a product by id
  app.delete("/api/v1/products/:id", productController.deleteProductById);
};
