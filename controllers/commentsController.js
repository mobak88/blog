import db from '../config/db.js';

export const createComment = async (req, res) => {
    const { commentText, userId, postId } = req.body;

    try {
        const [rows] = await db.query('SELECT * FROM users WHERE id = ?', [userId]);

        if (rows.length === 0) {
            return res
                .status(400)
                .json({ message: "Brukeren finnes ikke" });
        }

        if (!commentText || !userId || !postId) {
            return res
                .status(400)
                .json({ message: "Venligst fyll ut alle felter" });
        }

        await db.query('INSERT INTO comments (comment_text, user_id, post_id) VALUES (?, ?, ?)', [commentText, userId, postId]);

        res.status(201).json({ message: 'Kommentar registrert' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Serverfeil' });
    }
};

export const getAllComments = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT comments.*, users.username FROM comments JOIN users ON comments.user_id = users.id');
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Serverfeil' });
    }
};

export const getSingleComment = async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await db.query('SELECT comments.*, users.username FROM comments JOIN users ON comments.user_id = users.id WHERE comments.id = ?', [id]);
        if (rows.length === 0) {
            return res
                .status(400)
                .json({ message: "Kommentar finnes ikke" });
        }
        res.json(rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Serverfeil' });
    }
};

export const deleteComment = async (req, res) => {
    const { id } = req.params;
    try {
        await db.query('DELETE FROM comments WHERE id = ?', [id]);
        res.status(200).json({ message: 'Kommentar slettet' });
    } catch (error) {
        res.status(500).json({ message: 'Serverfeil' });
    }
};