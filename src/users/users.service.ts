
import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateResult, DeleteResult } from  'typeorm';
import { UserEntity } from './entity/user.entity';

@Injectable()
export class UsersService {

    constructor(@InjectRepository(UserEntity) private usersRepository: Repository<UserEntity>) { }

    async getAllUsers(): Promise<UserEntity[]> {
        return await this.usersRepository.find();
    }

    async getUser(_id: number): Promise<UserEntity[]> {
        return await this.usersRepository.find({
            select: ["fullName", "birthday", "isActive"],
            where: [{ "id": _id }]
        });
    }
    async createUser(user: UserEntity): Promise<UserEntity>  {
        return await this.usersRepository.save(user)
    }
    async updateUser(user: UserEntity): Promise<UpdateResult> {
        return await this.usersRepository.update(user.id, user)
    }
    async deleteUser(id): Promise<DeleteResult> {
        return await this.usersRepository.delete(id);
    }
}