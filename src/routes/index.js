import { Router } from "express";
import manager from "./manager/index.js";
import pharmacy from "./pharmacy/index.js";

const router = Router();

router.use("/api/manager", manager);
router.use("/api/pharmacy", pharmacy);

export default router;
