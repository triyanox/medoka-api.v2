import {
  login,
  logout,
  recover,
  register,
  setPassword,
  updateInfo,
  updatePassword,
  verifyEmail,
} from "../../controllers/index.js";
import auth from "../../middleware/auth.js";
import { Router } from "express";

const router = Router();

router.post("/", register);
router.post("/verify/:managerId", verifyEmail);
router.put("/password", auth, updatePassword);
router.put("/info", auth, updateInfo);
router.put("/recover", recover);
router.put("/setpassword/:token", setPassword);
router.post("/auth", login);
router.post("/logout", logout);

export default router;
