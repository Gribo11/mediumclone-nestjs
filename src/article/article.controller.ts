import { Controller, Post } from "@nestjs/common";
import { ArticleService } from "./article.service";

@Controller("articles")
export class ArticleContorller {
  constructor(private readonly articleService: ArticleService) {}

  @Post()
  async create() {
    return this.articleService.createArticle();
  }
}
