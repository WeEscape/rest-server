import { GroupController } from './../controllers/group.controller';
import express, { Request, Response, NextFunction, Router } from 'express';
import { logger } from '../config/logger.config';
import { groupValidation } from '../middleware/validation/validation';
import { GroupService } from '../services/group.service';
import { checkAccessToken } from '../utils/checkHeader.utll';

// const groupRouter = express.Router();

// // 그룹
// groupRouter.post(
//   '/',
//   groupValidation.createGroup,
//   async (req: Request, res: Response, next: NextFunction) => {
//     logger.info(JSON.stringify(req.body));
//     try {
//       const groupData = req.body;
//       const result = await GroupService.createGroup(groupData);
//       return res.status(200).send({ message: 'success!', data: result });
//     } catch (err) {
//       logger.error(err);
//       return res.status(400).send(err);
//     }
//   },
// );

// groupRouter.get(
//   '/:group_id',
//   groupValidation.readGroup,
//   async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       const user_id = await checkAccessToken(req);
//       const { group_id } = req.params;
//       const groupData = { group_id, user_id };
//       const result = await GroupService.getGroup(groupData);

//       if (!result) {
//         throw new Error('undefined');
//       }

//       return res.status(200).send(result);
//     } catch (err) {
//       next(err);
//       return res.status(400).send({ message: 'group_id is notdefined' });
//     }
//   },
// );

// groupRouter.put(
//   '/:group_id',
//   groupValidation.updateGroup,
//   async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       const user_id = await checkAccessToken(req);
//       const { group_id } = req.params;
//       const { title } = req.body;
//       if (!user_id) {
//         throw new Error('undefined');
//       }

//       const groupData = { title, group_id, user_id };
//       const result = await GroupService.editGroup(groupData);

//       return res.status(200).send(result);
//     } catch (err) {
//       next(err);
//     }
//   },
// );

// groupRouter.delete(
//   '/:group_id',
//   groupValidation.deleteGroup,
//   async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       const user_id = await checkAccessToken(req);
//       const { group_id } = req.params;

//       if (!user_id) {
//         throw new Error('undefined');
//       }

//       const groupData = { group_id, user_id };
//       await GroupService.deleteGroup(groupData);

//       return res.status(200).send({ message: 'success delete' });
//     } catch (err) {
//       next(err);
//       logger.error(err);
//       return res.status(400).send({ message: 'access_token is not defined' });
//     }
//   },
// );

// // 그룹 유저
// groupRouter.post(
//   '/users',
//   groupValidation.createGroupUser,
//   async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       const userData = req.body;
//       const result = await GroupService.createGroupUser(userData);

//       return res.status(200).send({ message: 'success!', data: result });
//     } catch (err) {
//       next(err);
//       return res.status(400).send({ message: err });
//     }
//   },
// );

// groupRouter.get(
//   '/users/:group_id',
//   groupValidation.readGroup,
//   async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       const user_id = await checkAccessToken(req);
//       const { group_id } = req.params;

//       if (!user_id) {
//         throw new Error('undefined');
//       }

//       const groupData = { group_id, user_id };
//       const result = await GroupService.getGroupUser(groupData);

//       return res.status(200).send(result);
//     } catch (err) {
//       next(err);
//       return res.status(400).send({ message: 'access_token is not defined' });
//     }
//   },
// );

// groupRouter.delete(
//   '/users/:group_id',
//   groupValidation.deleteGroup,
//   async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       const user_id = await checkAccessToken(req);
//       const { group_id } = req.params;

//       if (!user_id) {
//         throw new Error('undefined');
//       }

//       const groupData = { group_id, user_id };
//       await GroupService.deleteGroupUser(groupData);

//       return res.status(200).send({ message: 'success delete' });
//     } catch (err) {
//       next(err);
//       return res.status(400).send({ message: 'access_token is not defined' });
//     }
//   },
// );

class GroupRouter {
  router: Router = Router();
  groupController: GroupController;

  constructor() {
    const grupService = new GroupService();
    this.groupController = new GroupController(grupService);
    this.initRoutes();
  }

  initRoutes() {
    this.router.post('/:group_id', this.groupController.createGroup);
    this.router.get('/', this.groupController.getGroup);
    this.router.put('/:group_id', this.groupController.updateGruop);
    this.router.delete('/:group_id', this.groupController.deleteGroup);
  }
}

const groupRouter = new GroupRouter();

export default groupRouter.router;
