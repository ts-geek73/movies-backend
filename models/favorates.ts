import mongoose, { Document, Schema } from 'mongoose';

interface IFavorite extends Document {
  movie_id: number;
}

const FavoriteSchema: Schema = new Schema(
  {
    movie_id: { type: Number, required: true },
    },
);

const Favorite = mongoose.model<IFavorite>('Favorite', FavoriteSchema);

export { Favorite, IFavorite };
