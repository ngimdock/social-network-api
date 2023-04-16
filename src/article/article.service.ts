import { Injectable } from '@nestjs/common';
import {
  ArticleCreateInput,
  ArticleCreateOutput,
  ArticleDeleteOutput,
  ArticlePagination,
  ArticlePaginationArgs,
  ArticleUpdateInput,
  ArticleUpdateOutput,
} from './dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Article } from './models';
import { Repository } from 'typeorm';
import { ArticleNotFoundException } from './exceptions';
import { JwtPayloadType } from 'src/auth/types';
import { User } from 'src/user/models';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article)
    private readonly articleRepository: Repository<Article>,
  ) {}

  async createArticle(
    user: JwtPayloadType,
    input: ArticleCreateInput,
  ): Promise<ArticleCreateOutput> {
    const createdArticle = this.articleRepository.create(input);

    createdArticle.author = new User();

    createdArticle.author.id = user.sub;

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

  async deleteArticle(articleId: Article['id']): Promise<ArticleDeleteOutput> {
    const articleToDelete = await this.findOne(articleId);

    this.articleRepository.remove(articleToDelete);

    return { id: articleToDelete.id };
  }

  async articlesPaginated(
    args: ArticlePaginationArgs,
  ): Promise<ArticlePagination> {
    const { skip, take, sortBy } = args;

    const qb = this.articleRepository.createQueryBuilder('article');
    qb.skip(skip).take(take);

    if (args.sortBy) {
      if (sortBy.title) qb.addOrderBy('article.title', sortBy.title);
      if (sortBy.createdAt)
        qb.addOrderBy('article.createdAt', sortBy.createdAt);
    }

    const [nodes, totalCount] = await qb.getManyAndCount();

    return { nodes, totalCount };
  }

  async articlesForUser(userId: string) {
    const articles = await this.articleRepository.find({
      where: {
        authorId: userId,
      },
    });

    return articles;
  }

  async findOne(id: string): Promise<Article> {
    const foundArticle = await this.articleRepository.findOne(id);

    if (!foundArticle) throw new ArticleNotFoundException();

    return foundArticle;
  }
}
