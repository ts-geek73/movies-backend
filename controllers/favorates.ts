import { Request, Response } from 'express';
import { Favorite } from '../models/favorates';
import Movie from '../models/movies';

const favoratesController = {
    getAllFavorate: async (req: Request, res: Response) => {
        try {
            const favorites = await Favorite.find().sort({ movie_id: 1 });
            res.status(200).json(favorites);
        } catch (error) {
            res.status(500).json('Error fetching favorites: ' + error);
        }
    },

    addFavorate: async (req: Request, res: Response): Promise<Response> => {
        try {

            const movie_id  = req.params.id;

            if (!movie_id) {
                return res.status(400).json('Movie ID is required');
            }

            const movieExist = await Movie.find({ movie_id  });
            if (!movieExist) {
                return res.status(404).json({ message: 'Movie Does not Exist in db' });
            }

            const existingFavorite = await Favorite.findOne({ movie_id });
            if (existingFavorite) {
                return res.status(400).json({ message: 'Movie already in favorites' });
            }

            const favorite = new Favorite({ movie_id });
            await favorite.save();

            return res.status(201).json(favorite);
        } catch (error) {
            return res.status(500).json({ message: 'Error adding to favorites' });
        }
    },

    deleteFavorate: async (req: Request, res: Response): Promise<Response> => {
        try {
            const  movie_id  = req.params.id;
            // console.log('movie_id:', movie_id);
            

            const favorite = await Favorite.deleteMany({ movie_id });
            if (!favorite) {
                return res.status(404).send('Favorite movie not found' );
            }

            return res.status(200).send(favorite);
        } catch (error) {
            console.error('Error deleting from favorites:', error);
            return res.status(500).send('Error deleting from favorites' );
        }
    }
};

export { favoratesController };
