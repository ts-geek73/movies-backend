import { Request, Response } from 'express';
import Movie from '../models/movies';
import Category from '../models/categoty';

const searchController = {
    movieSearch: async(req:Request , res: Response) : Promise<Response> =>{
        try{
            let  currentTitle = req.query.title;
            
            const movie = await Movie.find({ title: { $regex: `^${currentTitle}`, $options: 'i' } }).sort({ movie_id : 1})
            if(movie.length === 0){
                return res.status(404).send("No Movies Found")
            }

            return res.status(200).json(movie)
        }
        catch(err){
            return res.send(500).send(`Error: ${err}`)
        }
    },

    filterMovies : async (req:Request , res: Response) : Promise<Response> =>{
        try{
            const title = req.query.category;
            // console.log(`title: ${title}`);
            
            const catagory = await Category.findOne({ title })
            // console.log(`category : ${catagory}`);
            
            if (!catagory) {
                return res.status(404).send("Category not found");
            }

            // console.log(`movies : Processs`);
            const movies = await Movie.find({ categories: {$in : catagory.category_id} }).sort({ movie_id : 1})
            // console.log(`movies : ${movies}`);
            

            if (movies.length === 0) {
                return res.status(404).send("No Movies found for this category");
            }

            return res.status(200).json(movies);

        }
        catch(err){
            return res.status(500).send(`Error : ${err}`)
        }
    }
};

export { searchController }