import express from 'express';
import { logger } from '../config/logger.config.js';
import { GroupsTable } from '../models/groups.model.js';
import { GroupsUsersTable } from '../models/groupsUsers.model.js';
import { GroupService } from '../services/group.service.js';
import { decodeAccessToken } from '../services/jwt.service.js';

const groupRouter = express.Router();

// 그룹
groupRouter.post('/', async (req, res, next) => {
  logger.info(JSON.stringify(req.body));
  try {
    const groupData = req.body;
    const result = await GroupService.createGroup(GroupsTable, groupData);
    return res.status(200).send({ message: 'success!', data: result });
  } catch (err) {
    logger.error(err);
    return res.status(400).send(err);
  }
});

groupRouter.get('/:group_id', async (req, res, next) => {
  try {
    const { group_id } = req.params;
    const request_header = req.headers['authorization'];
    const access_token = request_header.split(' ')[1];
    const { id: user_id } = await decodeAccessToken(access_token);
    const groupData = { group_id, user_id };
    const result = await GroupService.getGroup(GroupsTable, groupData);
    if (!result.group_id) throw new Error('undefined');
    return res.status(200).send(result);
  } catch (err) {
    next(err);
    return res.status(400).send({ message: 'group_id is notdefined' });
  }
});

groupRouter.put('/:group_id', async (req, res, next) => {
  try {
    const { group_id } = req.params;
    const request_header = req.headers['authorization'];
    const access_token = request_header.split(' ')[1];
    const { id: user_id } = await decodeAccessToken(access_token);
    if (!user_id) throw new Error('undefined');
    const groupData = { group_id, user_id };
    const result = await GroupService.editGroup(GroupsTable, groupData);
    return res.status(200).send(result);
  } catch (err) {
    next(err);
  }
});

groupRouter.delete('/:group_id', async (req, res, next) => {
  try {
    const { group_id } = req.params;
    const request_header = req.headers['authorization'];
    const access_token = request_header.split(' ')[1];
    const { id: user_id } = await decodeAccessToken(access_token);
    if (!user_id) throw new Error('undefined');
    const groupData = { group_id, user_id, };
    await GroupService.deleteGroup(GroupsTable, groupData);
    return res.status(200).send({ message: 'success delete' });
  } catch (err) {
    next(err);
    logger.error(err);
    return res.status(400).send({ message: 'access_token is not defined' });
  }
});

// 그룹 유저
groupRouter.post('/users', async (req, res, next) => {
  try {
    const userData = req.body;
    const result = await GroupService.createGroupUser(
      GroupsUsersTable,
      userData,
    );
    return res.status(200).send({ message: 'success!', data: result });
  } catch (err) {
    next(err);
    return res.status(400).send({ message: err });
  }
});
groupRouter.get('/users/:group_id', async (req, res, next) => {
  try {
    const { group_id } = req.params;
    const request_header = req.headers['authorization'];
    const access_token = request_header.split(' ')[1];
    const { id: user_id } = await decodeAccessToken(access_token);
    if (!user_id) throw new Error('undefined');
    const groupData = { group_id, user_id };
    const result = await GroupService.getGroupUser(
      GroupsUsersTable,
      user,
      groupData,
    );
    return res.status(200).send(result);
  } catch (err) {
    next(err);
    return res.status(400).send({ message: 'access_token is not defined' });
  }
});

groupRouter.delete('/users/:group_id', async (req, res, next) => {
  try {
    const { group_id } = req.params;
    const request_header = req.headers['authorization'];
    const access_token = request_header.split(' ')[1];
    const { id: user_id } = await decodeAccessToken(access_token);
    if (!user_id) throw new Error('undefined');
    const groupData = { group_id, user_id };
    await GroupService.deleteGroupUser(GroupsUsersTable, groupData);
    return res.status(200).send({ message: 'success delete' });
  } catch (err) {
    next(err);
    return res.status(400).send({ message: 'access_token is not defined' });
  }
});

export default groupRouter;
