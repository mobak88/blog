// app.js
import express from 'express';
import authRoutes from './routes/auth.js';
import postsRoutes from './routes/posts.js';
import commentsRoutes from './routes/comments.js';

const app = express();

// Middleware
app.use(express.json());

// Bruk autentiseringsrutene
app.use('/auth', authRoutes);
app.use('/', postsRoutes);
app.use('/', commentsRoutes);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Start serveren
const url = process.env.URL || 'localhost';
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Serveren kjører på port  http://${url}:${port}`);
});