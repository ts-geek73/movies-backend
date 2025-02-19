import { Request, Response } from 'express';
import Movie from '../models/movies';
import Category from '../models/categoty';

const moviesController = {

    getAllMovie: async (req: Request, res: Response): Promise<Response> => {
        try {
            const moviesList = await Movie.find().sort({ movie_id : 1});
            
            if (moviesList.length === 0) {
                return res.status(404).send("No Movies Found");
            }
            
            return res.status(200).json(moviesList);
        } catch (err) {
            return res.status(500).send(`Error: ${err}`);
        }
    },

    getMovieById: async (req: Request, res: Response): Promise<Response> => {
        try {
            // const movieId = req.params.id; 
            // const movie = await Movie.find({movie_id:movieId}).sort({ movie_id : 1})

            // if (!movie) {
            //     return res.status(404).send('Movie not found');
            // }

            const movieId = req.params.id;
            const movie = await Movie.findOne({ movie_id: movieId });
            

            return res.status(200).json(movie);
        } catch (err) {
            return res.status(500).send(`Error: ${err}`);
        }
    },

    createMovie: async (req: Request, res: Response): Promise<Response> => {
        try {
            
            const { title, release, director, rating, description, categories, image } = req.body;
            
            
            // console.log("Body: = ",req.body);
            if (!title || !release || !director || !rating || !description || categories.length === 0) {
                // console.log("1");

                return res.status(404).send("Missing required fields");
            }
            
            // console.log("Pass 1");
            
            
            const lastMovie = await Movie.findOne().sort({ movie_id: -1 });
            
            const nextMovieId = lastMovie ? lastMovie.movie_id + 1 : 1;
            
            // console.log("Pass 2");
            const categoryIds = await Category.find({ category_id: { $in: categories } }).select('category_id');
            if (categoryIds.length !== categories.length) {
                return res.status(404).send("Some categories are invalid");
            }
            
            // console.log("Pass 3");
            const newMovie = new Movie({
                movie_id: nextMovieId, 
                title,
                release,
                director,
                rating,
                description,
                categories,
                image,
            });
            
            // console.log("Pass 4");
            await newMovie.save();

            return res.status(201).send("Movie created successfully");
        } catch (err) {
            // console.log("Error:", err);
            
            return res.status(500).send(`Error: ${err}`);
        }
    },

    updateMovie: async (req: Request, res: Response): Promise<Response> => {
        try {
            const movieId = req.params.id; 
            const updateData = req.body;

            const movie = await Movie.find({movie_id: movieId});
            if (!movie) {
                return res.status(404).send('Movie not found');
            }

            const updatedMovie = await Movie.updateOne({movie_id:movieId}, updateData); 
            return res.status(200).json(updatedMovie);
            // return res.status(200).send("Movie Updated")
        } catch (err) {
            return res.status(500).send(`Error: ${err}`);
        }
    },

    deleteById: async (req: Request, res: Response): Promise<Response> => {
        try {
            const movieId = req.params.id; 

            const movie = await Movie.findOne({movie_id: movieId});
            if (!movie) {
                return res.status(404).send('Movie not found');
            }

            await Movie.deleteOne({ movie_id : movieId });

            return res.status(200).send('Movie deleted successfully');
        } catch (err) {
            return res.status(500).send(`Error: ${err}`);
        }
    }
};

export { moviesController };
