import db from '../config/db.js';

export const createPost = async (req, res) => {
    const { postTitle, postText, userId } = req.body;

    try {
        // Sjekk om brukeren eksisterer
        const [rows] = await db.query('SELECT * FROM users WHERE id = ?', [userId]);

        if (rows.length === 0) {
            return res
                .status(400)
                .json({ message: "Brukeren finnes ikke" });
        }

        if (!postTitle || !postText || !userId) {
            return res
                .status(400)
                .json({ message: "Venligst fyll ut alle felter" });
        }

        await db.query('INSERT INTO posts (post_title, post_text, user_id) VALUES (?, ?, ?)', [postTitle, postText, userId]);

        res.status(201).json({ message: 'Innlegg registrert' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Serverfeil' });
    }
};

export const getAllPosts = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT posts.*, users.username FROM posts JOIN users ON posts.user_id = users.id WHERE posts.id');
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Serverfeil' });
    }
};

export const getSinglePost = async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await db.query(
            'SELECT posts.*, users.username FROM posts JOIN users ON posts.user_id = users.id WHERE posts.id = ?',
            [id]
        );

        if (rows.length === 0) {
            return res
                .status(400)
                .json({ message: "Innlegget finnes ikke" });
        }

        res.json(rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Serverfeil' });
    }
};

export const deletePost = async (req, res) => {
    const { id } = req.params;
    try {
        await db.query('DELETE FROM posts WHERE id = ?', [id]);
        res.status(200).json({ message: 'Innlegg slettet' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Serverfeil' });
    }
};