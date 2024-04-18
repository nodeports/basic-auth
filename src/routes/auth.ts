import express from "express";
import { registerUser, loginUser } from "../controllers/auth";
import { protect } from "../middlewares/auth";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", protect, (req, res) => {
  res.json(req.user);
});

export default router;
