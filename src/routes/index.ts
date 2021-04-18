import { Router } from 'express';
import usersRoutes from '../domains/users/routes';

const router = Router();

router.use('/users', usersRoutes);

export default router;
