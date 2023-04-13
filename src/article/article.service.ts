import { Injectable } from '@nestjs/common';
import {
  ArticleCreateInput,
  ArticleCreateOutput,
  ArticleUpdateInput,
  ArticleUpdateOutput,
} from './dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Article } from './models';
import { Repository } from 'typeorm';
import { ArticleNotFoundException } from './exceptions';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article)
    private readonly articleRepository: Repository<Article>,
  ) {}

  async createArticle(input: ArticleCreateInput): Promise<ArticleCreateOutput> {
    const createdArticle = this.articleRepository.create(input);

    const article = await this.articleRepository.save(createdArticle);

    return { article };
  }

  async updateArticle(
    articleId: Article['id'],
    input: ArticleUpdateInput,
  ): Promise<ArticleUpdateOutput> {
    const articleToUpdate = await this.findOne(articleId);

    articleToUpdate.title = input.title;
    articleToUpdate.description = input.description;
    articleToUpdate.image = input.image;

    const article = await this.articleRepository.save(articleToUpdate);

    return { article };
  }

  async deleteArticle(articleId: Article['id']): Promise<ArticleUpdateOutput> {
    const articleToDelete = await this.findOne(articleId);

    this.articleRepository.remove(articleToDelete);

    return { article: articleToDelete };
  }

  async articleList(): Promise<Article[]> {
    return this.articleRepository.find();
  }

  async findOne(id: string): Promise<Article> {
    const foundArticle = await this.articleRepository.findOne(id);

    if (!foundArticle) throw new ArticleNotFoundException();

    return foundArticle;
  }
}
