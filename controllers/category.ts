import { Request, Response } from 'express';
import Category from '../models/categoty'
import Movie from '../models/movies';


const categoryController = {

    getAllCategory: async (req: Request, res: Response): Promise<Response> => {
        try {
            const categories = await Category.find();

            if (categories.length === 0) {
                return res.status(404).send("No Categories Found");
            }

            return res.status(200).json(categories);
        } catch (err) {
            return res.status(500).send(`Error: ${err}`);
        }
    },


    getMoviesByCategory: async (req: Request, res: Response): Promise<Response> => {
        try {
            const { title } = req.params;
            // console.log("title: " , title);
            
    
            const category = await Category.findOne({ title });
            // console.log("categoty" , category);
            
            if (!category) {
                return res.status(404).send("Category not found");
            }
    
            // console.log("paass1");
            
            const movies = await Movie.find({ categories: { $in: [category.category_id] } }).sort({ movie_id: 1 });
    
            if (movies.length === 0) {
                return res.status(404).send("No Movies found for this category");
            }
            // console.log("pass2");
            
    
            return res.status(200).json(movies);
        } catch (err) {
            return res.status(500).send(`Error: ${err}`);
        }
    },

    createCategory: async (req: Request, res: Response): Promise<Response> => {
        try {
            const { title, icon } = req.body;

            if (!title || !icon) {
                return res.status(400).send('Please provide all fields' );
            }

            const exist_category = await Category.findOne({ title });
            if (exist_category) {
                return res.status(400).send("Category already exists");
            }

            const lastCategory = await Category.findOne().sort({ category_id: -1 });
            const nextCategoryId = lastCategory ? lastCategory.category_id + 1 : 1;

            const newCategory = new Category({
                category_id: nextCategoryId,
                title,
                icon,
            });

            newCategory.save();
            return res.status(200).send("Category Created");
        } catch (err) {
            return res.status(500).send(`Error: ${err}`);
        }
    }
};

export { categoryController };
