import bcrypt from 'bcrypt';
import pool from '../database/configdb.js';
import jwt from 'jsonwebtoken';

export const registerUser = async ({ username, password, email }) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Verifica se já existe usuário
    const userExists = await pool.query(
        'SELECT id FROM users WHERE username = $1 OR email = $2',
        [username, email]
    );
    if (userExists.rows.length > 0) {
        throw new Error('Username or email already exists');
    }

    const result = await pool.query(
        'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id, username, email',
        [username, email, hashedPassword]
    );
    return result.rows[0];
};

export const loginUser = async ({ username, password, email }) => {
    const result = await pool.query(
        'SELECT id, username, email, password FROM users WHERE username = $1 AND email = $2',
        [username, email]
    );
    const user = result.rows[0];
    if (!user) {
        throw new Error('User not found');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error('Invalid credentials');
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Não retorne a senha!
    delete user.password;
    return { user, token };
};

export const getAllUsers = async () => {
    const result = await pool.query('SELECT id, username, email FROM users');
    return result.rows;
};