import { Response, Request, Router } from 'express';
const router = Router();

router.get('/', function (req: Request, res: Response) {
    res.send('GET request to the homepage');
});

export default router;
