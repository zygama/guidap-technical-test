import { Router } from 'express';
import hobbyClubApi from './api/hobby-club';

const router = Router();

router.use('/hobby-club', hobbyClubApi);

export default router;
