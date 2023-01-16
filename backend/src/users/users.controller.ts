import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, Patch, Post, UseInterceptors } from '@nestjs/common';
import { SeqScope } from 'src/utils';
import { CreateUserDto } from './dto/create-user.dto';
import { ResponseUserDto } from './dto/response-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  @UseInterceptors(ClassSerializerInterceptor)
  async create(@Body() createUserDto: CreateUserDto): Promise<ResponseUserDto> {
    return this.usersService.create(createUserDto)
      .then((user) => {
        return ResponseUserDto.fromUser(user);
      })
  }

  @Get()
  async findAll(): Promise<ResponseUserDto[]> {
    return this.usersService.findAll(SeqScope.Full).then((users) => {
      return users.map(user => ResponseUserDto.fromUser(user));
    })
  }

  @Get(':uuid')
  async findOne(@Param('uuid') uuid: string): Promise<ResponseUserDto> {
    return await this.usersService.findOne(uuid, SeqScope.Full)
      .then((user) => {
        return ResponseUserDto.fromUser(user);
      })
  }

  @Patch(':uuid')
  async update(@Param('uuid') uuid: string, @Body() updateUserDto: UpdateUserDto): Promise<Array<number>> {
    return this.usersService.update(uuid, updateUserDto);
  }

  @Delete(':uuid')
  async remove(@Param('uuid') uuid: string): Promise<number> {
    return this.usersService.remove(uuid);
  }
}
