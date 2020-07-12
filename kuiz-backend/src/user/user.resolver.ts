import { Resolver, Query } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';

import { User } from './user.model';

const pubSub = new PubSub();

@Resolver(of => User)
export class UserResolver {
  @Query(returns => User)
  async user(): Promise<User> {
    return {
      id: 1,
      email: 'thtjwls',
    };
  }
}
