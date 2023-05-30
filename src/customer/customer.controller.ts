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
import { CustomerService } from './customer.service';
import { CustomerEntity } from './customer.entity/customer.entity';
import { ResponseHelper } from 'helper/common/response.helper';
import { ApiResponse } from 'helper/common/response.interface';
import { UpdateResult } from 'typeorm/query-builder/result/UpdateResult';

@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Post()
  async create(
    @Body() item: CustomerEntity,
  ): Promise<ApiResponse<CustomerEntity>> {
    try {
      const res = await this.customerService.create(item);
      return ResponseHelper.success(res);
    } catch (error) {
      return ResponseHelper.error(0, error);
    }
  }

  @Get()
  async findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ): Promise<ApiResponse<CustomerEntity[]>> {
    try {
      const [res, totalCount] = await this.customerService.findAll(page, limit);
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
  async findOne(@Param() param): Promise<ApiResponse<CustomerEntity[]>> {
    try {
      const res = await this.customerService.findOne(param.id);
      return ResponseHelper.success(res);
    } catch (error) {
      return ResponseHelper.error(0, error);
    }
  }
  @Put()
  async update(
    @Body() item: CustomerEntity,
  ): Promise<ApiResponse<UpdateResult>> {
    try {
      const res = await this.customerService.update(item);
      return ResponseHelper.success(res);
    } catch (error) {
      return ResponseHelper.error(0, error);
    }
  }

  @Delete(':id')
  async remove(@Param() param) {
    try {
      const res = await this.customerService.remove(param.id);
      return ResponseHelper.success(res);
    } catch (error) {
      return ResponseHelper.error(0, error);
    }
  }
}
