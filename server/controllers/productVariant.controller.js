const db = require("../models");
const ProductVariant = db.productVarian;
const Product = db.product;
// exports.createProductVariant = (req, res) => {
//   ProductVariant.create({
//     product_id: req.body.product_id,
//     code: req.body.code,
//     name: req.body.name,
//     image_location: req.body.image_location,
//     qty: req.body.qty,
//     price: req.body.price,
//     active: req.body.active,
//     created_user: req.body.created_user,
//   })
//     .then((variant) => {
//       res
//         .status(201)
//         .send({ message: "Product variant created successfully", variant });
//     })
//     .catch((err) => {
//       res.status(500).send({ message: err.message });
//     });
// };

exports.createProductVariant = (req, res) => {
  const {
    product_id,
    code,
    name,
    image_location,
    qty,
    price,
    active,
    created_user,
  } = req.body;

  // Check if product_id is empty
  if (!product_id) {
    return res.status(400).send({ message: "Product ID cannot be empty" });
  }

  // Check if product_id is valid
  Product.findByPk(product_id)
    .then((product) => {
      if (!product) {
        return res.status(400).send({ message: "Invalid product ID" });
      }

      // Create product variant
      ProductVariant.create({
        product_id,
        code,
        name,
        image_location,
        qty,
        price,
        active,
        created_user,
      })
        .then((variant) => {
          res
            .status(201)
            .send({ message: "Product variant created successfully", variant });
        })
        .catch((err) => {
          res.status(500).send({ message: err.message });
        });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.findAllProductVariants = (req, res) => {
  ProductVariant.findAll()
    .then((variants) => {
      res.status(200).send(variants);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while retrieving product variants.",
      });
    });
};

exports.findOneProductVariant = (req, res) => {
  const id = req.params.id;

  ProductVariant.findByPk(id)
    .then((variant) => {
      if (!variant) {
        return res.status(404).send({ message: "Product variant not found." });
      }
      res.status(200).send(variant);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while retrieving product variant.",
      });
    });
};

exports.updateProductVariant = (req, res) => {
  const id = req.params.id;

  ProductVariant.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Product variant was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Product variant with id=${id}. Maybe Product variant was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Product variant with id=" + id,
      });
    });
};

exports.deleteProductVariant = (req, res) => {
  const id = req.params.id;

  ProductVariant.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Product variant was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Product variant with id=${id}. Maybe Product variant was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Product variant with id=" + id,
      });
    });
};
