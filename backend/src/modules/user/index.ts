import { PrismaClient, Prisma, User } from '@prisma/client';
import { userInterface } from '../../interface/user';
import { resultInterface } from '../../interface/result';
import userEvents from '../../events/user';
import events from 'events';

class user {
  prismaUser: any;
  prisma: any;
  result: resultInterface;
  eventEmitter: NodeJS.EventEmitter;
  constructor() {
    this.eventEmitter = new events.EventEmitter();
    var userEventListianer = new userEvents(this.eventEmitter);
    userEventListianer.registerEvent();
    this.prisma = new PrismaClient();
    this.prismaUser = this.prisma.user;
    this.result = {
      error: false,
      message: 'user',
      statusCode: 200,
      data: {},
    };
  }

  async getUsers() {
    return await this.prismaUser.findMany();
  }

  async getUsersById(userId: number) {
    this.eventEmitter.emit("beforeGetUsersByIdEvent");
    await this.prismaUser
      .findUnique({
        where: {
          id: userId,
        },
      })
      .then((getUser: User) => {
        this.result.data = getUser;
        this.result.message = 'Succesfully fetched';
        this.result.statusCode = 200;
      })
      .catch((error: Error) => {
        this.errorHandling(error);
      })
      .finally(async () => {
        await this.prisma.$disconnect();
      });
    
    this.eventEmitter.emit("afterGetUsersByIdEvent",this.result);
    return this.result;
  }

  async getUsersByEmail(userEmail: string) {
    this.eventEmitter.emit("beforeGetUsersByIdEmail");
    await this.prismaUser
      .findUnique({
        where: {
          email: userEmail,
        },
      })
      .then((getUser: User) => {
        this.result.data = getUser;
        this.result.message = 'Succesfully fetched';
        this.result.statusCode = 200;
      })
      .catch((error: Error) => {
        this.errorHandling(error);
      })
      .finally(async () => {
        await this.prisma.$disconnect();
      });
      this.eventEmitter.emit("afterGetUsersByIdEmail",this.result);
    return this.result;
  }

  async registerNewUser(userparam: userInterface) {
    this.eventEmitter.emit("beforeRegisterNewUser");
    await this.prismaUser
      .create({ data: userparam })
      .then((newUser: User) => {
        this.result.data = newUser;
        this.result.message = 'Succesfully created';
        this.result.statusCode = 200;
      })
      .catch((error: Error) => {
        this.errorHandling(error);
      })
      .finally(async () => {
        await this.prisma.$disconnect();
      });
    this.eventEmitter.emit("afterRegisterNewUser",this.result);
    return this.result;
  }

  async updateUser(userparam: userInterface) {
    this.eventEmitter.emit("beforeUpdateUser");
    await this.prismaUser
      .update({
        where: {
          email: userparam.email,
        },
        data: userparam,
      })
      .then((updatedUser: User) => {
        this.result.data = updatedUser;
        this.result.message = 'Succesfully updated';
      })
      .catch((error: Error) => {
        this.errorHandling(error);
      })
      .finally(async () => {
        await this.prisma.$disconnect();
      });
      
    this.eventEmitter.emit("afterUpdateUser",this.result);
    return this.result;
  }

  errorHandling(error: Error) {
    this.eventEmitter.emit("beforeUserError");
    this.result.error = true;
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === 'P2002'
    ) {
      this.result.message = 'Email already exists';
      this.result.statusCode = 400;
      return this.result.message;
    }
    this.result.message = 'Internal server error';
    this.result.statusCode = 500;
    return this.result.message;
  }
}
let userModle = new user();
export default userModle;
