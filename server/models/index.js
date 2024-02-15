const config = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.dialect,
  pool: {
    max: config.pool.max,
    min: config.pool.min,
    acquire: config.pool.acquire,
    idle: config.pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.role = require("../models/role.model.js")(sequelize, Sequelize);
db.product = require("../models/product.model.js")(sequelize, Sequelize);
db.productVarian = require("../models/productVariant.model.js")(
  sequelize,
  Sequelize
);
db.productCategory = require("../models/productCategory.model.js")(
  sequelize,
  Sequelize
);
db.transaction = require("../models/transaction.model.js")(
  sequelize,
  Sequelize
);
db.transactionDetail = require("../models/transactionDetail.model.js")(
  sequelize,
  Sequelize
);
db.image = require("../models/images.model.js")(sequelize, Sequelize);

db.role.belongsToMany(db.user, { through: "user_roles", foreignKey: "roleId" });
db.user.belongsToMany(db.role, { through: "user_roles", foreignKey: "userId" });

db.product.hasMany(db.productVarian, { foreignKey: "product_id" });
db.productVarian.belongsTo(db.product, { foreignKey: "product_id" });

db.transaction.hasMany(db.transactionDetail, { foreignKey: "transaction_id" });
db.transactionDetail.belongsTo(db.transaction, {
  foreignKey: "transaction_id",
});

db.productVarian.hasMany(db.transactionDetail, {
  foreignKey: "product_variant_id",
});
db.transactionDetail.belongsTo(db.productVarian, {
  foreignKey: "product_variant_id",
});

db.ROLES = ["administrator", "customer"];

module.exports = db;
