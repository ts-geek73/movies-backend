import express, { RequestHandler } from 'express';
import { categoryController } from '../controllers/category';

const router = express.Router();

router.get('/', categoryController.getAllCategory as unknown as RequestHandler)
router.get('/:id', categoryController.getMoviesByCategory as unknown as RequestHandler)
router.post('/', categoryController.createCategory as unknown as RequestHandler)


export default router;
