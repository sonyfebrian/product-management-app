const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "dqw6zit8r",
  api_key: "722696568492761",
  api_secret: "FlFHfDW8hexmafXoavU0ZvHfFrE",
});

const UploadFile = (file, folder) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(file, { folder }, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

module.exports = UploadFile;
