import * as express from 'express';
import { UserDataRepository } from '../repositories/user';
import { IUserModelUpdates, IUserModel, UserRepository } from '../typings';
import { createUserModel } from '../utils';

const router = express.Router()

router.get('/:id', async (req, res, next) => {
  const id: string = req.params.id;
  const repository: UserRepository = new UserDataRepository();
  try {
    const user: IUserModel = await repository.getUserModel(id);
    res.status(200).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
  next();
});

router.post('/create', async (req, res, next) => {
  const id: string = req.body.id;
  const model: IUserModel = createUserModel(id);
  const repository: UserRepository = new UserDataRepository();
  try {
    await repository.setUserModel(id, model);
    res.status(200).send();
  } catch (error) {
    res.status(400).send(error);
  }
  next();
});

router.post('/update', async (req, res, next) => {
  const { id, updates }: { id: string, updates: IUserModelUpdates } = req.body;
  const repository: UserRepository = new UserDataRepository();
  try {
    await repository.updateUserModel(id, updates);
    res.status(200).send();
  } catch (error) {
    res.status(400).send(error);
  }
  next();
});

export default router;