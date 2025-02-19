import { RequestHandler, Router } from "express";
import { searchController } from "../controllers/search";

const router = Router();

router.get("/", searchController.movieSearch as unknown as RequestHandler)

router.get("/filter", searchController.filterMovies as unknown as RequestHandler)

export default router;