module.exports = (sequelize, Sequelize) => {
  const TransactionDetail = sequelize.define("transaction_details", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    transaction_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "transactions",
        key: "id",
      },
    },
    product_variant_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "product_variants",
        key: "id",
      },
    },
    // price: {
    //   type: Sequelize.DECIMAL(10, 2),
    // },
    qty: {
      type: Sequelize.INTEGER,
    },
    subtotal: {
      type: Sequelize.DECIMAL(10, 2),
    },
    active: {
      type: Sequelize.BOOLEAN,
      defaultValue: true,
    },
    created_user: {
      type: Sequelize.STRING,
    },
    created_date: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    },
    updated_user: {
      type: Sequelize.STRING,
    },
    updated_date: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    },
  });

  return TransactionDetail;
};
