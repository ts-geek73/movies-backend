import { RequestHandler, Router } from "express";
import { userController } from "../controllers/user";

const router = Router();

router.post("/register", userController.createUser as unknown as RequestHandler)
router.post("/login", userController.loginUser as unknown as RequestHandler)

export default router;