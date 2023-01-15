import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, UseInterceptors, ClassSerializerInterceptor, ValidationPipe, UsePipes, HttpCode } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ResponseUserDto } from './dto/response-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @UseInterceptors(ClassSerializerInterceptor)
  async create(@Body() createUserDto: CreateUserDto): Promise<ResponseUserDto> {
    const newUser = await this.usersService.create(createUserDto);
    return new ResponseUserDto(newUser);
  }

  @Get()
  async findAll(): Promise<ResponseUserDto[]> {
    const newUsers = await this.usersService.findAll();
    return newUsers.map(newUser => new ResponseUserDto(newUser));
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<object> {
    const user = await this.usersService.findOne(+id);
    return new ResponseUserDto(user);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
