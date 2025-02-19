import express, { RequestHandler } from 'express';
import {  favoratesController } from "../controllers/favorates";

const router = express.Router();

router.get("/", favoratesController.getAllFavorate as unknown as RequestHandler);
router.post("/:id", favoratesController.addFavorate as unknown as RequestHandler);
router.delete("/:id", favoratesController.deleteFavorate as unknown as RequestHandler);

export default router;
