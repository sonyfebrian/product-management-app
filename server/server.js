const express = require("express");
const cors = require("cors");
var bcrypt = require("bcryptjs");
const app = express();

var corsOptions = {
  origin: "http://localhost:8081",
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

//database
const db = require("./models");
const Role = db.role;
const User = db.user;

// for development
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and Resync Database with { force: true }");
//   initial();
// });

// for productiont
db.sequelize.sync().then(() => {
  console.log("connect database");
  initial();
});

//routes
require("./routes/auth.routes")(app);
require("./routes/user.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

const saltRounds = 10;
// Initialization function for creating initial data
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

    await Promise.all([
      User.create({
        id: 1,
        username: "customer",
        password: hashedPasswordCustomer,
      }).then((user) => user.setRoles(rolesCustomer)),
      User.create({
        id: 2,
        username: "admin",
        password: hashedPasswordAdmin,
      }).then((user) => user.setRoles(rolesAdmin)),
    ]);

    console.log("Initialization data added successfully.");
  } catch (error) {
    console.error("Error initializing data:", error);
    process.exit(1);
  }
}
