import { Controller, Get, Post, Body, Put, Param, Delete,Query } from '@nestjs/common';
import { MainStoreService } from './main-store.service';
import { MainStoreEntity } from './entities/main-store.entity';
import { ResponseHelper } from 'helper/common/response.helper';
import { ApiResponse } from 'helper/common/response.interface';
import { UpdateResult } from 'typeorm/query-builder/result/UpdateResult';

@Controller('main-store')
export class MainStoreController {
  constructor(private readonly mainStoreService: MainStoreService) {}

  @Post()
  async create(@Body() item: MainStoreEntity): Promise<ApiResponse<MainStoreEntity>> {
    const res =  await this.mainStoreService.create(item);
    return ResponseHelper.success(res);
  }

  @Get()
  async findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ): Promise<ApiResponse<MainStoreEntity[]>> {
    const res = await this.mainStoreService.findAll();
    return ResponseHelper.success(res);
  }
  
  @Get(':id')
  async findOne(@Param() param): Promise<ApiResponse<MainStoreEntity[]>>  { 
    const res = await this.mainStoreService.findOne(param.id);
    return ResponseHelper.success(res);
  }
  @Put()
  async update(@Body() item: MainStoreEntity): Promise<ApiResponse<UpdateResult>> {
    const res =  await this.mainStoreService.update(item);
    return ResponseHelper.success(res);
  }

  @Delete(':id')
  async remove(@Param() param) {
    const res = await this.mainStoreService.remove(param.id);
    return ResponseHelper.success(res);;
  }
}
