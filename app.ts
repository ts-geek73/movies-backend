import express from 'express';
import movieRoutes from "./routes/movie"
import categoryRoutes from "./routes/category"
import searchRoute from "./routes/search"
import userRoutes from "./routes/user"
import favorateRoute from "./routes/favorates"
import cors from 'cors'
import './db'

const app = express();

app.use(cors());
app.use(express.json());

app.use('/movie', movieRoutes);
app.use('/category', categoryRoutes);
app.use('/search', searchRoute);
app.use('/favorite', favorateRoute);
app.use('/', userRoutes);

app.listen(8000, () => {
    console.log('App running on port 8000');
});
