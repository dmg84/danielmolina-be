import { Router } from 'express';
import ExampleRoutes from '../domains/example/routes';

const router = Router();

router.use('/example', ExampleRoutes);

export default router;
