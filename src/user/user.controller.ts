import { Body, Controller, Get, Post, UsePipes, ValidationPipe, Req, UseGuards } from "@nestjs/common";
import { UserService } from "@app/user/user.service";
import { CreateUserDto } from "./dto/createUser.dto";
import { userResponseInterface } from "./types/userResponse.interface";
import { LoginUserDto } from "./dto/login.dto";
import { Request } from 'express';
import { ExpressRequestInterface } from "@app/types.ts/expressRequest.interface";
import { User } from "./decorators/user.decoratir";
import { UserEntity } from "./user.entity";
import { AuthGuard } from "./guards/guard";

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post("users")
  @UsePipes(new ValidationPipe())
  async createUser(
    @Body("user") createUserDto: CreateUserDto
  ): Promise<userResponseInterface> {
    const user = await this.userService.createUser(createUserDto);
    return this.userService.buidUserResponse(user)
  }

  @Post('users/login')
  @UsePipes(new ValidationPipe())
  async login(@Body('user') loginUserDto:LoginUserDto):Promise<userResponseInterface>{
    const user = await this.userService.login(loginUserDto)
    return this.userService.buidUserResponse(user)
  }

  @Get('user')
  @UseGuards(AuthGuard)
  async currentUser(@Req() request: ExpressRequestInterface,
  @User() user:UserEntity,
  ):Promise<userResponseInterface>{
    return this.userService.buidUserResponse(request.user);
  }
}
