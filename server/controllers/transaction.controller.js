const db = require("../models");
const Transaction = db.transaction;
const TransactionDetail = db.transactionDetail;
const ProductVariant = db.productVarian;

exports.createTransaction = (req, res) => {
  const { transaction_no, total_amount, created_user } = req.body;

  // Check if transaction_no is empty
  if (!transaction_no) {
    return res
      .status(400)
      .send({ message: "Transaction number cannot be empty" });
  }

  // Create transaction
  Transaction.create({
    transaction_no,
    total_amount,
    active: true,
    created_user,
  })
    .then((transaction) => {
      res
        .status(201)
        .send({ message: "Transaction created successfully", transaction });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.getAllTransactions = (req, res) => {
  Transaction.findAll()
    .then((transactions) => {
      res.send(transactions);
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.getAllTransactionDetails = (req, res) => {
  TransactionDetail.findAll({
    include: [
      {
        model: ProductVariant,
        attributes: ["price"], // Ambil hanya kolom price dari ProductVariant
      },
    ],
  })
    .then((transactionDetails) => {
      res.status(200).send(transactionDetails);
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.createTransactionDetail = (req, res) => {
  const {
    transaction_id,
    product_variant_id,
    price,
    qty,
    subtotal,
    created_user,
  } = req.body;

  // Check if transaction_id and product_variant_id are provided
  if (!transaction_id || !product_variant_id) {
    return res
      .status(400)
      .send({ message: "Transaction ID and Product Variant ID are required" });
  }

  // Check if the provided product variant exists
  ProductVariant.findByPk(product_variant_id)
    .then((productVariant) => {
      if (!productVariant) {
        return res.status(404).send({ message: "Product variant not found" });
      }

      // Create the transaction detail
      TransactionDetail.create({
        transaction_id,
        product_variant_id,
        price,
        qty,
        subtotal,
        created_user,
      })
        .then((transactionDetail) => {
          res.status(201).send({
            message: "Transaction detail created successfully",
            transactionDetail,
          });
        })
        .catch((err) => {
          res.status(500).send({ message: err.message });
        });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};
