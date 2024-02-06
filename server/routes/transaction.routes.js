const { authJwt } = require("../middleware");
const controller = require("../controllers/transaction.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  // Create a new transaction
  app.post("/api/v1/transactions", controller.createTransaction);

  // Retrieve all transactions
  app.get("/api/v1/transactions", controller.getAllTransactions);

  app.get("/api/v1/transactions-details", controller.getAllTransactionDetails);

  app.post("/api/v1/transactions-details", controller.createTransactionDetail);
};
