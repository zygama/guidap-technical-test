import { Router } from 'express';
import hobbyClubApi from './api/hobby-club';
import activityApi from './api/activity';

const router = Router();

router.use('/hobby-club', hobbyClubApi);
router.use('/activity', activityApi);

export default router;
