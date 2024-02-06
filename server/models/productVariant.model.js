module.exports = (sequelize, Sequelize) => {
  const ProductVariant = sequelize.define("product_variants", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    product_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "products",
        key: "id",
      },
    },
    code: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    image_location: {
      type: Sequelize.STRING,
    },
    qty: {
      type: Sequelize.INTEGER,
    },
    price: {
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

  return ProductVariant;
};
