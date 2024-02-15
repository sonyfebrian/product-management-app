const express = require("express");
const cors = require("cors");
var bcrypt = require("bcryptjs");
const app = express();
const morgan = require("morgan");

var corsOptions = {
  origin: "http://localhost:5173",
};

global.__basedir = __dirname;

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

app.use(morgan("dev"));

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

//database
const db = require("./models");
const Role = db.role;
const User = db.user;
const Transaction = db.transaction;
const TransactionDetail = db.transactionDetail;
const ProductCategory = db.productCategory;
const Product = db.product;
const ProductVariant = db.productVarian;

// for development
db.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and Resync Database with { force: true }");
  initial();
});

// for productiont
// db.sequelize.sync().then(() => {
//   console.log("connect database");
//   initial();
// });

//routes
require("./routes/auth.routes")(app);
require("./routes/user.routes")(app);
require("./routes/product.routes")(app);
require("./routes/productCategory.routes")(app);
require("./routes/productVariant.routes")(app);
require("./routes/transaction.routes")(app);
require("./routes/file.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

const saltRounds = 10;

async function initial() {
  try {
    await Promise.all([
      Role.create({ id: 1, name: "administrator" }),
      Role.create({ id: 2, name: "customer" }),
    ]);

    const [rolesCustomer, rolesAdmin] = await Promise.all([
      Role.findAll({ where: { name: "customer" } }),
      Role.findAll({ where: { name: "administrator" } }),
    ]);

    const hashedPasswordCustomer = await bcrypt.hash("123", saltRounds);
    const hashedPasswordAdmin = await bcrypt.hash("admin123", saltRounds);

    const [userCustomer, userAdmin] = await Promise.all([
      User.create({
        id: 1,
        username: "customer",
        password: hashedPasswordCustomer,
      }),
      User.create({
        id: 2,
        username: "admin",
        password: hashedPasswordAdmin,
      }),
    ]);

    await Promise.all([
      userCustomer.setRoles(rolesCustomer),
      userAdmin.setRoles(rolesAdmin),
    ]);

    const [category1, category2] = await Promise.all([
      ProductCategory.create({
        name: "Electronics",
        active: true,
        created_user: "admin",
      }),
      ProductCategory.create({
        name: "Clothing",
        active: true,
        created_user: "admin",
      }),
    ]);

    const [product1, product2] = await Promise.all([
      Product.create({
        plu: "P001",
        name: "Laptop",
        product_category_id: category1.id,
        active: true,
        created_user: "admin",
      }),
      Product.create({
        plu: "P002",
        name: "T-shirt",
        product_category_id: category2.id,
        active: true,
        created_user: "admin",
      }),
    ]);

    // await Promise.all([
    //   ProductVariant.create({
    //     product_id: product1.id,
    //     code: "LV001",
    //     name: "Laptop Variant 1",
    //     image_location:
    //       "https://fastly.picsum.photos/id/6/5000/3333.jpg?hmac=pq9FRpg2xkAQ7J9JTrBtyFcp9-qvlu8ycAi7bUHlL7I",
    //     qty: 10,
    //     price: 1200.0,
    //     active: true,
    //     created_user: "admin",
    //   }),
    //   ProductVariant.create({
    //     product_id: product2.id,
    //     code: "TS001",
    //     name: "T-shirt Variant 1",
    //     image_location:
    //       "https://fastly.picsum.photos/id/63/5000/2813.jpg?hmac=HvaeSK6WT-G9bYF_CyB2m1ARQirL8UMnygdU9W6PDvM",
    //     qty: 20,
    //     price: 25.0,
    //     active: true,
    //     created_user: "admin",
    //   }),
    // ]);
    const productVariant1 = await ProductVariant.create({
      product_id: product1.id,
      code: "LV001",
      name: "Laptop Variant 1",
      image_location:
        "https://fastly.picsum.photos/id/6/5000/3333.jpg?hmac=pq9FRpg2xkAQ7J9JTrBtyFcp9-qvlu8ycAi7bUHlL7I",
      qty: 1055,
      price: 1200,
      active: true,
      created_user: "admin",
    });
    const productVariant2 = await ProductVariant.create({
      product_id: product1.id,
      code: "LV002",
      name: "Laptop Variant 2",
      image_location:
        "https://fastly.picsum.photos/id/63/5000/2813.jpg?hmac=HvaeSK6WT-G9bYF_CyB2m1ARQirL8UMnygdU9W6PDvM",
      qty: 10,
      price: 12,
      active: true,
      created_user: "admin",
    });

    const transaction1 = await Transaction.create({
      transaction_no: "TRN123456",
      total_amount: 100.0,
      active: true,
      created_user: "admin",
    });

    await TransactionDetail.create({
      transaction_id: transaction1.id,
      product_variant_id: productVariant1.id,
      qty: 2,
      subtotal: 100.0,
      active: true,
      created_user: "admin",
    });

    const transaction2 = await Transaction.create({
      transaction_no: "TRN7891011",
      total_amount: 150.0,
      active: true,
      created_user: "admin",
    });

    await TransactionDetail.create({
      transaction_id: transaction2.id,
      product_variant_id: productVariant2.id,
      qty: 2,
      subtotal: 150.0,
      active: true,
      created_user: "admin",
    });

    console.log("Initialization data added successfully.");
  } catch (error) {
    console.error("Error initializing data:", error);
    process.exit(1);
  }
}
