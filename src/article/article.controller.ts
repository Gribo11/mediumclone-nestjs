import { User } from "@app/user/decorators/user.decoratir";
import { AuthGuard } from "@app/user/guards/guard";
import { UserEntity } from "@app/user/user.entity";
import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { ArticleService } from "./article.service";
import { CreateArticleDto } from "./dto/createArticle.dto";

@Controller("articles")
export class ArticleContorller {
  constructor(private readonly articleService: ArticleService) {}

  @Post()
  @UseGuards(AuthGuard)
  async create(
    @User() currentUser: UserEntity,
    @Body("article") createArticleDto: CreateArticleDto
  ): Promise<any> {
    return this.articleService.createArticle(currentUser, createArticleDto);
  }
}
