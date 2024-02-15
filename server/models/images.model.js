module.exports = (sequelize, Sequelize) => {
  const Image = sequelize.define("images", {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    image_url: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  });
  return Image;
};
