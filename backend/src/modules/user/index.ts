import { PrismaClient, Prisma, User } from '@prisma/client';
import { userInterface } from '../../interface/user';
import events from 'events';

class user {
  prismaUser: any;
  prisma: any;
  result: any;
  constructor() {
    this.prisma = new PrismaClient();
    this.prismaUser = this.prisma.user;
    this.result = {
      error: false,
      message: 'create user ',
      statusCode: 200,
      data: {},
    };
    const eventEmitter = new events();
  }

  async getUsers() {
    return await this.prismaUser.findMany();
  }

  async getUsersById(userId: number) {
    let user = await this.prismaUser
      .findUnique({
        where: {
          id: userId,
        },
      })
      .then((getUser: User) => {
        this.result.data = getUser;
        this.result.message = 'Succesfully fetched';
      })
      .catch((error: Error) => {
        this.errorHandling(error);
      })
      .finally(async () => {
        await this.prisma.$disconnect();
      });
    
    return this.result;
  }

  async getUsersByEmail(userEmail: string) {
    let user = await this.prismaUser
      .findUnique({
        where: {
          email: userEmail,
        },
      })
      .then((getUser: User) => {
        this.result.data = getUser;
        this.result.message = 'Succesfully fetched';
      })
      .catch((error: Error) => {
        this.errorHandling(error);
      })
      .finally(async () => {
        await this.prisma.$disconnect();
      });
    
    return this.result;
  }

  async registerNewUser(userparam: userInterface) {
    await this.prismaUser
      .create({ data: userparam })
      .then((newUser: User) => {
        this.result.data = newUser;
        this.result.message = 'Succesfully created';
      })
      .catch((error: Error) => {
        this.errorHandling(error);
      })
      .finally(async () => {
        await this.prisma.$disconnect();
      });
    return this.result;
  }

  async updateUser(userparam: userInterface) {
    console.log(userparam);
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
      
    return this.result;
  }

  errorHandling(error: Error) {
    console.log(error);
    this.result.error = true;
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === 'P2002'
    ) {
      this.result.message = 'Email already exists';
      this.result.status = 400;
      return this.result.message;
    }
    this.result.message = 'Internal server error';
    this.result.status = 500;
    return this.result.message;
  }
}
let userModle = new user();
export default userModle;
