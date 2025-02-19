import express, { NextFunction } from 'express';
import movieRoutes from "./routes/movie"
import categoryRoutes from "./routes/category"
import searchRoute from "./routes/search"
import userRoutes from "./routes/user"
import favorateRoute from "./routes/favorates"
import cors from 'cors'
import { userCheck, adminCheck } from './middleware/authorization';
import './db'

const app = express();
const port = process.env.PORT ;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/movie', movieRoutes);
app.use('/category', categoryRoutes);
app.use('/search', searchRoute);
app.use('/favorite', favorateRoute);
app.use('/', userRoutes);

app.listen(port, () => {
    console.log(`App running on port ${port}`);
});
