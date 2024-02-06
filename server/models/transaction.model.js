module.exports = (sequelize, Sequelize) => {
  const Transaction = sequelize.define("transactions", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    transaction_no: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    total_amount: {
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

  return Transaction;
};
