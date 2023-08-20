import { Router, Request, Response } from 'express';
import userModle from '../modules/user/index';

class userRoute {
  route: any;
  constructor() {
    this.route = Router();  
  }
  registerRoutes() {
    this.getAllUsers();
    this.createNewUser();
    this.updateUser();
    this.getUserById();
    return this.route;
  }

  createNewUser() {
    this.route.post(
      '/create',
      async (request: Request, response: Response) => {
        let createUser = await userModle.registerNewUser(request.body.params);
        response.status(createUser.statusCode).json(createUser);
      }
    );
  }

  getUserById(){
    this.route.get('/:userId', async (request: Request, response: Response) => {
      let users = await userModle.getUsersById(parseInt(request.params.userId));
      response.json({users});
    });
  }

  updateUser(){
    this.route.put(
      '/update',
      async (request: Request, response: Response) => {
        let updateUser = await userModle.updateUser(request.body.params);
        response.status(updateUser.statusCode).json(updateUser);
      }
    );
  }

  getAllUsers() {
    this.route.get('/', async (request: Request, response: Response) => {
      let users = await userModle.getUsers();
      response.json({ users });
    });
  }
}

let userRoutes = new userRoute();
export default userRoutes;
