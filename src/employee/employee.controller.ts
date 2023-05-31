
import {
    Controller,
    Get,
    Post,
    Body,
    Put,
    Param,
    Delete,
    Query,
  } from '@nestjs/common';
  import { EmployeeService } from './employee.service';
  import { EmployeeEntity } from './employee.entity/employee.entity';
  import { ResponseHelper } from 'helper/common/response.helper';
  import { ApiResponse } from 'helper/common/response.interface';
  import { UpdateResult } from 'typeorm/query-builder/result/UpdateResult';
  import {Common} from './../../helper/common/common'
  
  @Controller('employee')
  export class EmployeeController {
    constructor(private readonly service: EmployeeService) {}
  
    @Post()
    async create( @Body() item: EmployeeEntity, ): Promise<ApiResponse<EmployeeEntity>> {

      try {
        item.keySearch = Common.removeAccents(item.fullName)+Common.removeAccents(item.address)+item.phone
        const res = await this.service.create(item);
        return ResponseHelper.success(res);
      } catch (error) {
        return ResponseHelper.error(0, error);
      }
   
    }
  
    @Get()
    async findAll(
      @Query('page') page: number = 1,
      @Query('limit') limit: number = 10,
      @Query() params,
    ): Promise<ApiResponse<EmployeeEntity[]>> {
      try {
        const [res, totalCount] = await this.service.findAll(page, limit,params);
        return {
          statusCode: 200,
          message: 'Thành công!',
          data: res,
          meta: {
            totalCount,
            currentPage: page,
            totalPages: Math.ceil(totalCount / limit),
          },
        };
      } catch (error) {
        return ResponseHelper.error(0, error);
      }
    }
  
    @Get(':id')
    async findOne(@Param() param): Promise<ApiResponse<EmployeeEntity[]>> {
      try {
        const res = await this.service.findOne(param.id);
        return ResponseHelper.success(res);
      } catch (error) {
        return ResponseHelper.error(0, error);
      }
    }
    @Put()
    async update(
      @Body() item: EmployeeEntity,
    ): Promise<ApiResponse<UpdateResult>> {
      try {
        const res = await this.service.update(item);
        return ResponseHelper.success(res);
      } catch (error) {
        return ResponseHelper.error(0, error);
      }
    }
  
    @Delete(':id')
    async remove(@Param() param) {
      try {
        const res = await this.service.remove(param.id);
        return ResponseHelper.success(res);
      } catch (error) {
        return ResponseHelper.error(0, error);
      }
    }
  }
  