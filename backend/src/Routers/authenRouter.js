const express = require("express");
const router = express.Router();
const {
  register,
  login,
  getIndividualUser,
  getAllusers,
  deleteUser,
} = require("../Apps/Controllers/authenController");
const verify = require("../middleware/checkAuth");
const verifyToken = require("../middleware/checkAuth");

router.post("/register", register);
router.post("/login", login);

router.get("/users", verify, getAllusers);
router.get("/user/:id", verify, getIndividualUser);
router.get("/user/delete/:id", verifyToken, deleteUser);

module.exports = router;
