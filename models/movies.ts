import mongoose, { Schema, model, Document } from 'mongoose';

export interface IMovie extends Document {
  movie_id: number;
  title: string;
  release: number;
  director: string;
  rating: number;
  image: string;
  description: string;
  categories: number[]
}

const movieSchema = new Schema<IMovie>({
  movie_id: { type: Number, required: true },
  title: { type: String, required: true },
  release: { type: Number, required: true },
  director: { type: String, required: true },
  description: { type: String, required: true },
  rating: { type: Number, required: true },
  image: { type: String }, 
  categories: [{ type: Number, ref: 'Category' }]
});

const Movie = model<IMovie>('Movie', movieSchema);

export default Movie;
