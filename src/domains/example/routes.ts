import { Response, Request, Router } from 'express';
import pool from '../../database';

const router = Router();

router.get('/', async function (req: Request, res: Response) {
    const a = await pool
        .query('select * from danielmolina.test')
        .then((res) => res.rows[0])
        .catch((err) => console.error(err));
    console.log(a);
    res.send('GET request to the homepage: ' + a.id);
});

export default router;
