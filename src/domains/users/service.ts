import { createUser, getUserByUsernamePassword } from './repository';
import Jwt from 'jsonwebtoken';
import { Response } from 'express';
import { IUser } from './types';

export const login = async (username: string, password: string, res: Response): Promise<IUser> => {
    const user = await getUserByUsernamePassword(username, password);

    if (user) {
        setCookie(res, user.id);
        delete user.password;
    }

    return user;
};

export const create = async (username: string, password: string, res: Response): Promise<IUser> => {
    const user = await createUser(username, password);

    if (user) {
        setCookie(res, user.id);
        delete user.password;
    }

    return user;
};

const setCookie = (res: Response, user_id: string) => {
    const token = Jwt.sign({ id: user_id }, process.env.SYMMETRIC_KEY, { expiresIn: '12h' });
    res.cookie(process.env.COOKIE_NAME, token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production'
    });
};
