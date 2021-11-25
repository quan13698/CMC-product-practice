const Watches = require("../Models/Product");
const watchesHomePage = async (req, res) => {
  try {
    const watches = await Watches.find();
    res.status(200).json({
      success: true,
      length: watches.length,
      watches,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

const getProductById = async (req, res) => {
  try {
    const watch = await Watches.findById(req.params.id);
    res.status(201).json({
        success: true,
        data: watch
    });
  } catch (error) {
      console.log(error);
      res.status(400).json({
          success: false,
          message: "server error"
      })
  }
};
module.exports = {
  watchesHomePage,
  getProductById
};
