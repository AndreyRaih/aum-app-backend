import * as express from 'express';
import { ContentDataRepository } from '../repositories/content';
import { ContentRepository } from '../typings';

const router = express.Router()

router.get('/tags', async (req, res, next) => {
  const repository: ContentRepository = new ContentDataRepository();
  const result = await repository.getTags();
  res.status(200).send(result);
});

export default router;