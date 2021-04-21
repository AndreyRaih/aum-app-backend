import * as express from 'express';

import userService from './user';
import progressService from './progress';
import contentService from './content';

const router = express.Router()

router.use('/user', userService);
router.use('/progress', progressService);
router.use('/content', contentService);

export default router;
