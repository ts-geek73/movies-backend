import express, { RequestHandler } from 'express';
import {  moviesController } from "./../controllers/movies";

const router = express.Router();

router.get('/', moviesController.getAllMovie as unknown as RequestHandler);
router.post('/', moviesController.createMovie as unknown as RequestHandler);    
router.get('/:id', moviesController.getMovieById as unknown as RequestHandler);
router.put('/:id', moviesController.updateMovie     as unknown as RequestHandler);
router.delete('/:id', moviesController.deleteById   as unknown as RequestHandler);

export default router;
