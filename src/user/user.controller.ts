import { Body, Controller, Post, UsePipes, ValidationPipe } from "@nestjs/common";
import { UserService } from "@app/user/user.service";
import { CreateUserDto } from "./dto/createUser.dto";
import { userResponseInterface } from "./types/userResponse.interface";
import { LoginUserDto } from "./dto/login.dto";

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
}
