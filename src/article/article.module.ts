import { Module } from "@nestjs/common";
import { ArticleContorller } from "./article.controller";
import { ArticleService } from "./article.service";



@Module({
    controllers:[ArticleContorller],
    providers:[ArticleService]
})
export class ArticleModule{}