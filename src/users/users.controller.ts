

import { Controller, Post, Body, Get, Put, Delete,Param} from '@nestjs/common';
import { UsersService } from './users.service';
import { UserEntity } from './entity/user.entity';

@Controller('users')
export class UsersController {

    constructor(private service: UsersService) { }
   
    @Post()
    create(@Body() user: UserEntity) {
        return this.service.createUser(user);
    }
    
    @Get()
    getAll() {
        return this.service.getAllUsers();
    }

    @Get(':id')
    get(@Param() params) {
        return this.service.getUser(params.id);
    }
    
    @Put()
    update(@Body() user: UserEntity) {
        return this.service.updateUser(user);
    }

    @Delete(':id')
    deleteUser(@Param() params) {
        return this.service.deleteUser(params.id);
    }
}