import { UserEntity } from "@app/user/user.entity";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ArticleContorller } from "./article.controller";
import { ArticleEntity } from "./article.entity";
import { ArticleService } from "./article.service";



@Module({
    imports:[TypeOrmModule.forFeature([ArticleEntity,UserEntity])],
    controllers:[ArticleContorller],
    providers:[ArticleService],
})
export class ArticleModule{}