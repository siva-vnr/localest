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
    return this.route;
  }

  createNewUser() {
    this.route.get(
      '/new-user',
      async (request: Request, response: Response) => {
        let users = await userModle.registerNewUser({
          name: 'sivaaa',
          email: 'siva@superbotics.in',
          password: 'siva@123#',
          token: undefined,
          roleId: 1,
        });
        response.json({ users });
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
