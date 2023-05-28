import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Long, Repository } from 'typeorm';
import { UpdateResult, DeleteResult } from  'typeorm';
import { MainStoreEntity } from './entities/main-store.entity';
@Injectable()
export class MainStoreService {

  constructor(@InjectRepository(MainStoreEntity) private repository: Repository<MainStoreEntity>) { }

    async findAll(): Promise<MainStoreEntity[]> {
        return await this.repository.find();
    }
    async findOne(_id: number): Promise<MainStoreEntity[]> {
        return await this.repository.find({
            where: [{ "id": _id }]
        });
    }
    async create(item: MainStoreEntity): Promise<MainStoreEntity>  {
        item.createAt = Date.now().toString()
        item.updateAt = Date.now().toString()
        return await this.repository.save(item)
    }
    async update(item: MainStoreEntity): Promise<UpdateResult> {
        item.updateAt = Date.now().toString()
        return await this.repository.update(item.id, item)
    }

    async remove(id: number): Promise<DeleteResult> {
        return await this.repository.delete(id);
    }
}
