const db = require("../models");
const Product = db.product;
const ProductCategory = db.productCategory;

exports.createProduct = (req, res) => {
  ProductCategory.findByPk(req.body.product_category_id)
    .then((category) => {
      if (!category) {
        return res.status(400).send({ message: "Invalid product category." });
      }

      Product.create({
        plu: req.body.plu,
        name: req.body.name,
        product_category_id: req.body.product_category_id,
        active: req.body.active,
        created_user: req.body.created_user,
      })
        .then((product) => {
          res
            .status(201)
            .send({ message: "Product created successfully", product });
        })
        .catch((err) => {
          res.status(500).send({ message: err.message });
        });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.findAllProducts = (req, res) => {
  Product.findAll()
    .then((products) => {
      res.status(200).send({ products });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.findProductById = (req, res) => {
  const productId = req.params.id;

  Product.findByPk(productId)
    .then((product) => {
      if (!product) {
        return res.status(404).send({ message: "Product not found" });
      }

      res.status(200).send({ product });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.updateProductById = (req, res) => {
  const productId = req.params.id;

  Product.update(req.body, {
    where: { id: productId },
  })
    .then((result) => {
      if (result == 1) {
        res.status(200).send({ message: "Product updated successfully" });
      } else {
        res.status(404).send({
          message: `Cannot update Product with id=${productId}. Maybe Product was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.deleteProductById = (req, res) => {
  const productId = req.params.id;

  Product.destroy({
    where: { id: productId },
  })
    .then((result) => {
      if (result == 1) {
        res.status(200).send({ message: "Product deleted successfully" });
      } else {
        res.status(404).send({
          message: `Cannot delete Product with id=${productId}. Maybe Product was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};
