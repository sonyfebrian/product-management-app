module.exports = (sequelize, Sequelize) => {
  const Product = sequelize.define("products", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    plu: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    product_category_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "product_categories",
        key: "id",
      },
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

  return Product;
};
