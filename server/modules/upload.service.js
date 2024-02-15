const db = require("../models");
const model = db.image;

const UploadImage = async ({ image_url }) => {
  try {
    const data = await model.create({ image_url: image_url });
    return data;
  } catch (error) {
    throw error;
  }
};

module.exports = { UploadImage };
