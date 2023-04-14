import {
  Field,
  InterfaceType,
  ArgsType,
  Int,
  InputType,
  registerEnumType,
} from '@nestjs/graphql';
import { Node } from '../models';

export enum SortDirection {
  ASC = 'ASC',
  DESC = 'DESC',
}

registerEnumType(SortDirection, { name: 'sortDirection' });

@InputType()
export class PaginationSortBy {
  @Field(() => SortDirection, { nullable: true })
  createdAt: SortDirection;
}

@ArgsType()
export class PaginationArgs {
  @Field(() => Int)
  skip: number;

  @Field(() => Int)
  take: number;
}

@InterfaceType()
export abstract class Pagination<N extends Node = Node> {
  @Field()
  totalCount: number;

  @Field(() => [Node])
  nodes: N[];
}
