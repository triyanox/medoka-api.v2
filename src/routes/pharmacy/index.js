import {
  adress,
  info,
  avatar,
  phone,
  workHours,
  addUsers,
} from "../../controllers/index.js";
import auth from "../../middleware/auth.js";
import { Router } from "express";

const router = Router();

router.put("/info", auth, info);
router.put("/adress/:id", auth, adress);
router.put("/phone/:id", auth, phone);
router.put("/avatar/:id", auth, avatar);
router.put("/work/:id", auth, workHours);
router.post("/addusers/:id", auth, addUsers);

export default router;
