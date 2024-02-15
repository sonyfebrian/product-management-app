const response = require("../utils/responses");
const uploadFile = require("../middleware/cloudinary");
const service = require("../modules/upload.service");

const UploadImage = async (req, res) => {
  try {
    const { file } = req;
    if (!file) return response(res, 400, { message: "No image uploaded" });

    const upload = await uploadFile(
      file.path,
      "your folder path you have created on cloudinary."
    );
    const { secure_url: image_url } = upload;
    const result = await service.UploadImage({ image_url });

    return response(res, 201, result);
  } catch (error) {
    if (error.code == "LIMIT_FILE_SIZE") {
      return res.status(500).send({
        message: "File size cannot be larger than 2MB!",
      });
    }

    console.log(error.message);
    return response(res, 500, error.message);
  }
};

module.exports = { UploadImage };
