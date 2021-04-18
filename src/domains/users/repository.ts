import bcrypt from 'bcrypt';
import pool from '../../database';
import { IUser } from './types';

export const createUser = async (username: string, password: string): Promise<IUser> => {
    const salt = await bcrypt.genSalt(+process.env.SALT_ROUNDS);
    const hashedPass = await bcrypt.hash(password, salt);

    return pool
        .query(
            `INSERT INTO danielmolina.users(username, password)
             VALUES ($1, $2)
             RETURNING id, username;`,
            [username, hashedPass]
        )
        .then((res) => {
            return res.rows.length ? res.rows[0] : null;
        });
};

export const getUserByUsernamePassword = async (username: string, password: string): Promise<IUser | null> => {
    const user = await pool
        .query(
            `
                SELECT id,
                       username,
                       password
                FROM danielmolina.users
                WHERE username = $1;`,
            [username]
        )
        .then((res) => {
            return res.rows.length ? res.rows[0] : null;
        });

    if (user && bcrypt.compareSync(password, user.password)) {
        return user;
    }
    return null;
};

export const getUserById = (id: string): Promise<IUser | null> => {
    return pool
        .query(
            `
                SELECT id,
                       username
                FROM danielmolina.users
                WHERE id = $1`,
            [id]
        )
        .then((res) => {
            return res.rows.length ? res.rows[0] : null;
        });
};
