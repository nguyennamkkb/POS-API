import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Long, Repository } from 'typeorm';
import { UpdateResult, DeleteResult } from  'typeorm';
import { CustomerEntity } from './customer.entity/customer.entity';

@Injectable()
export class CustomerService {

  constructor(@InjectRepository(CustomerEntity) private repository: Repository<CustomerEntity>) { }

    async findAll(page: number, limit: number): Promise<[CustomerEntity[],number]> {
        const skip = (page - 1) * limit;
        const [res, totalCount] = await this.repository.findAndCount({
          skip,
          take: limit,
        });
    
        return [res, totalCount];
    }

    async findOne(_id: number): Promise<CustomerEntity[]> {
        return await this.repository.find({
            where: [{ "id": _id }]
        });
    }
    async create(item: CustomerEntity): Promise<CustomerEntity>  {
        item.createAt = Date.now().toString()
        item.updateAt = Date.now().toString()
        return await this.repository.save(item)
    }
    async update(item: CustomerEntity): Promise<UpdateResult> {
        item.updateAt = Date.now().toString()
        return await this.repository.update(item.id, item)
    }

    async remove(id: number): Promise<DeleteResult> {
        return await this.repository.delete(id);
    }

    

}
