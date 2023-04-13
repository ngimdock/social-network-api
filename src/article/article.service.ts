import { Injectable } from '@nestjs/common';
import {
  ArticleCreateInput,
  ArticleCreateOutput,
  ArticlePagination,
  ArticlePaginationArgs,
  ArticleUpdateInput,
  ArticleUpdateOutput,
} from './dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Article } from './models';
import { Repository } from 'typeorm';
import { ArticleNotFoundException } from './exceptions';
import { SortDirection } from 'src/pagination/dto';

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

  async articlesPaginated(
    args: ArticlePaginationArgs,
  ): Promise<ArticlePagination> {
    const [nodes, totalCount] = await this.articleRepository.findAndCount({
      skip: args.skip,
      take: args.take,
      order: {
        createdAd:
          args.sortBy?.createdAt === SortDirection.ASC ? 'ASC' : 'DESC',
        title: args.sortBy?.title === SortDirection.ASC ? 'ASC' : 'DESC',
      },
    });

    return { nodes, totalCount };
  }

  async findOne(id: string): Promise<Article> {
    const foundArticle = await this.articleRepository.findOne(id);

    if (!foundArticle) throw new ArticleNotFoundException();

    return foundArticle;
  }
}
