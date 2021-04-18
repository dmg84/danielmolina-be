import { Response, Request, Router } from 'express';
import { create, login } from './service';

const router = Router();

router.post('/', async (req: Request, res: Response) => {
    res.send(await create(req.body.username, req.body.password, res));
});

router.post('/login', async (req: Request, res: Response) => {
    res.send(await login(req.body.username, req.body.password, res));
});

export default router;
