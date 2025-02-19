import { Schema, model, Document } from 'mongoose';

export interface ICategory extends Document {
  category_id: number;
  title: string;
  icon : string;
}

const categorySchema = new Schema<ICategory>({
  category_id: { type: Number, required: true, unique: true },
  title: { type: String, required: true },
  icon: { type: String, required: true },
}, { versionKey: false });

const Category = model<ICategory>('Category', categorySchema);

export default Category;
