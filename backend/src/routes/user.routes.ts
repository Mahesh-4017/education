import express from "express";
import {
  registerUser,
  login,
  verifyUser,
  forgotPassword,
  resetPassword,
  tokenLogin
} from "../controllers/user.controller";

const router = express.Router();

router.route("/user").post(registerUser);
router.route("/user/login").post(login);
router.route("/user/verify").post(verifyUser);
router.route("/user/forgotPassword").post(forgotPassword);
router.route("/user/resetPassword").post(resetPassword);
router.route("/user/tokenLogin").post(tokenLogin).get(tokenLogin);

export default router;
