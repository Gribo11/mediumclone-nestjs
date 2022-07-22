import { JWT_SECRET } from "@app/config";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { sign } from "jsonwebtoken";
import { Repository } from "typeorm";
import { CreateUserDto } from "./dto/createUser.dto";
import { userResponseInterface } from "./types/userResponse.interface";
import { UserEntity } from "./user.entity";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}
  async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
    const newUser = new UserEntity();
    Object.assign(newUser, createUserDto);
    return await this.userRepository.save(newUser);
  }

  generateJwt(user:UserEntity):string{
    return sign({
      id:user.id,
      username:user.username, 
      email:user.email,
    }, JWT_SECRET);
  }

  buidUserResponse(user:UserEntity):userResponseInterface{
    return{
      user:{
        ...user,
        token:this.generateJwt(user)
      }
    }
  }


}

