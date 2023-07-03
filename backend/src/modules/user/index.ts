import { PrismaClient } from '@prisma/client'
import { userInterface } from '../../interface/user'

class user {
    prismaUser: any;
    constructor(){
        const prisma = new PrismaClient();
        this.prismaUser = prisma.user;
    }

    async getUsers(){
        return await this.prismaUser.findMany();
    }

    async registerNewUser(data: userInterface){
        return await this.prismaUser.create({data});
    }

}
let userModle = new user();
export default userModle;