const upload = require("../middleware/upload");
const controller = require("../controllers/file.controller");

module.exports = function (app) {
  app.post("/api/v1/upload", upload.single("file"), controller.UploadImage);
};
